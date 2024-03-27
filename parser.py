import warnings
from tree_sitter import Language, Parser

warnings.filterwarnings("ignore")


class CopybookParser:
    def __init__(self, copybook_path: str):
        self.language = self._get_language()
        self.parser = self._make_parser()
        self.tree = self.parse(copybook_path)

    def query(self, source):
        query = self.language.query(source)
        return query.matches(self.tree.root_node)

    def get_data_description(self):
        matches = self.query(
            """(data_description
                    level: (_) @level
                    name:  (_) @name
                    type:  (_) @type)"""
        )

        descriptions = []
        for match in matches:
            captures = match[1]

            level = captures["level"].text.decode("utf-8")
            name = captures["name"].text.decode("utf-8")
            _type = captures["type"].text.decode("utf-8")

            # limpa type
            typelist = _type.split(" ")

            _type = typelist[0]
            last = typelist[-1]
            comp = last if last.startswith("COMP") else None

            descriptions.append(
                {"level": level, "name": name, "type": _type, "comp": comp}
            )

        return descriptions

    def _make_parser(self):
        parser = Parser()
        parser.set_language(self.language)
        return parser

    def parse(self, copybook_path):
        with open(copybook_path, "r") as f:
            tree = self.parser.parse(bytes(f.read(), "utf8"))
        return tree

    def _get_language(self):
        Language.build_library("build/copybook.so", ["../tree-sitter-copybook"])
        return Language("build/copybook.so", "copybook")
