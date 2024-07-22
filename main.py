import tree_sitter_copybook as copybook
from tree_sitter import Language, Parser

COPYBOOK_LANGUAGE = Language(copybook.language())
parser = Parser(COPYBOOK_LANGUAGE)




# from pprint import pprint
# import _copybook as copybook
# from ebcdic import unpack
#
# def extract(group):
#     curr_byte = 0
#     children = []
#     for k, v in group.items():
#         if type(v) != dict:
#             continue
#
#         name = k
#         offset = v["bytes"]
#
#         _bytes = line[curr_byte : curr_byte + offset]
#         content = unpack(_bytes, v["type"], True)
#
#         curr_byte += offset
#
#         if "FILLER" not in name:
#             children.append((name, content))
#     return children
#
# if __name__ == "__main__":
#     with open("./sample-data/copybooks/DEBK1122.cpy") as f:
#         cpy = copybook.toDict(f.readlines())
#
#     with open("./sample-data/files/BRT.DEB.DEB1122.D240118.D310.SS000110", "rb") as f:
#
#         line = f.read(13)
#         headers = extract(cpy["DEB1122-REG-HEADER"])
#
#
#         for i in range(15):
#             line = f.read(13)
#             det = extract(cpy["DEB1122-REG-DETALHE"])
#             pprint(det)
