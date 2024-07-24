from os import fspath
from typing import List

from tree_sitter import Language, Node, Parser, Query


class Copybook:
    root: Node
    record_descriptions: list[dict] = None
    _parser_path = "../../cobol/tree-sitter/tree-sitter-copybook/copybook.so"

    def __init__(self, copybook_path: str):
        self.language = self._getLanguage()
        parser = Parser(self.language)
        with open(copybook_path) as cpy:
            source = cpy.read()
            tree = parser.parse(bytes(source, "utf8"))
            self.root = tree.root_node

        self.record_descriptions = self.get_record_descriptions()

    def get_root_group(self, name: str):
        for dd in self.record_descriptions:
            if dd["name"] == name:
                return dd

    def get_record_descriptions(self):
        if self.record_descriptions != None:
            return self.record_descriptions

        data_descriptions = self._match("(data_description) @c")
        capture_query = """(data_description
                               level: (_) @level
                               name:  (_) @name
                               type:  (type
                                          def:  (_) @def
                                          comp: (_)? @comp)? )"""
        captures = [self._capture(capture_query, data) for data in data_descriptions]

        records = []
        for capture in captures:
            record = {
                "level": capture["level"].text.decode("utf-8").upper(),
                "name": capture["name"].text.decode("utf-8").upper(),
                "children": [],
            }
            if _def := capture.get("def"):
                _def = _def.text.decode("utf-8").upper()

            if comp := capture.get("comp"):
                comp = comp.text.decode("utf-8").upper()

            if _def:
                data_type = self._assign_data_type(_def, comp)
                record["data_type"] = data_type
                record["bytes"] = self.calculate_number_of_bytes(_def, data_type)

            record["is_group"] = _def == None

            records.append(record)

        root_groups = self._organize_into_hierarchy(records)
        for root in root_groups:
            self._calculate_group_sizes(root)

        return root_groups

    def get_record_length(self) -> int:
        last = 0
        for idx, rec in enumerate(self.record_descriptions):
            if idx == 0:
                last = rec["bytes"]
                continue
            if rec["bytes"] != last:
                raise Exception(
                    f"O grupo {rec['name']} possui um tamanho diferente dos demais records de mesmo nível.\n"
                    + f"Tamanho esperado: {last} bytes.\n"
                    f"Tamanho encontrado: {rec['bytes']} bytes.\n"
                )
        return last

    def _match(self, query: str, root: Node | None = None) -> List[Node]:
        query: Query = self.language.query(query)
        if not root:
            root = self.root

        matches = []
        for _, match in query.matches(root):
            matches.extend(match.values())

        return matches

    def _capture(self, query: str, root: Node | None = None):
        query: Query = self.language.query(query)
        if not root:
            root = self.root

        captures = {}
        for node, key in query.captures(root):
            if not captures.get(key):
                captures[key] = node
        return captures

    def _assign_data_type(self, _def: str, comp: str | None):
        """
        ch : text                  |  x
        zd : zoned                 |  9
        zd+: signed zoned          | S9
        bi : binary                |  9 COMP
        bi+: signed binary         | S9 COMP
        pd : packed-decimal        |  9 COMP-3
        pd+: signed packed-decimal | S9 COMP-3"""

        first_char = _def[0]

        if comp == "COMP-3" and first_char == "S":
            return "pd+"
        if comp == "COMP-3":
            return "pd"
        if comp == "COMP" and first_char == "S":
            return "bi+"
        if comp == "COMP":
            return "bi"
        if first_char == "S":
            return "zd+"
        if first_char == "9":
            return "zd"

        return "ch"

    def calculate_number_of_bytes(self, _def: str, dtype: str):
        first_char = _def[0]
        bar = _def.replace("V", " ").replace("S", "").replace("-", "").split()

        # PIC 999, 9(3), XXX, X(3)...
        def get_pic_size(arg):
            if arg.find("(") > 0:
                return int(arg[arg.find("(") + 1 : arg.find(")")])
            else:
                return len(arg)

        length = get_pic_size(bar[0])

        if len(bar) == 2 and first_char != "V":
            length += get_pic_size(bar[1])

        # Data size in bytes
        if "pd" in dtype:
            return int(length / 2) + 1

        if "bi" in dtype:
            if length < 5:
                return 2
            elif length < 10:
                return 4
            else:
                return 8
        else:
            if first_char == "-":
                length += 1
            return length

    def _organize_into_hierarchy(self, records):
        roots = []
        stack = []

        for record in records:
            isStackEmpty = len(stack) == 0
            if isStackEmpty:
                roots.append(record)
                stack.append(record)
                continue

            isHigherLevel = record["level"] > stack[-1]["level"]
            if isHigherLevel:
                stack[-1]["children"].append(record)
                stack.append(record)
                continue

            # Deixa só definições que são filhas (=level maior) do item atual
            while len(stack) > 0 and record["level"] <= stack[-1]["level"]:
                stack.pop()

            if len(stack) > 0:
                parent = stack[-1]
                parent["children"].append(record)
                stack.append(record)
                continue

            roots.append(record)
            stack.append(record)

        return roots

    def _calculate_group_sizes(self, root):
        if not root["is_group"]:
            return root["bytes"]

        root["bytes"] = 0

        for child in root["children"]:
            nbytes = self._calculate_group_sizes(child)
            root["bytes"] += nbytes

        return root["bytes"]

    def _getLanguage(self ) -> Language:
        from ctypes import c_void_p, cdll

        name = "copybook"
        # path = "../cobol/tree-sitter/tree-sitter-copybook/copybook.so"
        #  ╾──────────────────────────────────────────────────────────────╼
        lib = cdll.LoadLibrary(fspath(self._parser_path))
        language_function = getattr(lib, f"tree_sitter_{name}")
        language_function.restype = c_void_p
        language_ptr = language_function()
        return Language(language_ptr)
