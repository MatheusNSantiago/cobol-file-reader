from typing import List

import tree_sitter_copybook as copybook
from tree_sitter import Language, Node, Parser, Query


class CopybookParser:
    root: Node
    data_descriptions: list[dict] = None

    def __init__(self, copybook_path: str):
        self.language = Language(copybook.language())
        parser = Parser(self.language)
        with open(copybook_path) as cpy:
            source = cpy.read()
            tree = parser.parse(bytes(source, "utf8"))
            self.root = tree.root_node

        self.data_descriptions = self.get_data_descriptions()

    def get_root_group(self, name: str):
        for dd in self.data_descriptions:
            if dd["name"] == name:
                return dd

    def get_data_descriptions(self):
        if self.data_descriptions != None:
            return self.data_descriptions

        data_descriptions = self._match("(data_description) @c")
        capture_query = """(data_description
                               level: (_) @level
                               name:  (_) @name
                               type:  (type
                                          def:  (_) @def
                                          comp: (_)? @comp)? )"""
        captures = [self._capture(capture_query, data) for data in data_descriptions]

        descriptions = []
        for capture in captures:
            description = {}

            description["level"] = capture["level"].text.decode("utf-8").upper()
            description["name"] = capture["name"].text.decode("utf-8").upper()

            if _def := capture.get("def"):
                _def = _def.text.decode("utf-8").upper()

            if comp := capture.get("comp"):
                comp = comp.text.decode("utf-8").upper()

            if _def:
                data_type = self._assign_data_type(_def, comp)
                description["data_type"] = data_type

            descriptions.append(description)

        return self._organize_into_hierarchy(descriptions)

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

    def _organize_into_hierarchy(self, crudeDataDefinitions):
        descriptions = []
        stack = []

        for item in crudeDataDefinitions:
            level = item["level"]
            name = item["name"]
            dtype = item.get("data_type")

            desc = {
                "level": level,
                "name": name,
                "data_type": dtype,
                "children": [],
            }

            isStackEmpty = len(stack) == 0
            if isStackEmpty:
                descriptions.append(desc)
                stack.append(desc)
                continue

            isLevelHigher = level > stack[-1]["level"]
            if isLevelHigher:
                stack[-1]["children"].append(desc)
                stack.append(desc)
                continue

            while len(stack) > 0 and level <= stack[-1]["level"]:
                stack.pop()

            if len(stack) > 0:
                stack[-1]["children"].append(desc)
                stack.append(desc)
                continue

            descriptions.append(desc)
            stack.append(desc)

        return descriptions
