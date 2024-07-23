from pprint import pprint

from converter import extract, translate_bytes
from copybook import CopybookParser


if __name__ == "__main__":
    copybook = CopybookParser("./sample-data/copybooks/DEBK1122.cpy")
    pprint(copybook.get_root_group("DEB1122-REG-HEADER"))

    with open("./sample-data/files/BRT.DEB.DEB1122.D240118.D310.SS000110", "rb") as f:
        line = f.read(13)
        header_group = copybook.get_root_group("DEB1122-REG-HEADER")


        headers = extract(header_group)

        for i in range(15):
            line = f.read(13)
            det = extract(cpy["DEB1122-REG-DETALHE"])
            pprint(det)
