from pprint import pprint

from converter import translate_group
from copybook import Copybook
from file import File

if __name__ == "__main__":
    copybook = Copybook("./sample-data/copybooks/DEBK1122.cpy")

    SIZE = 13
    file = File("./sample-data/files/BRT.DEB.DEB1122.D240118.D310.SS000110", SIZE)

    det_group = copybook.get_root_group("DEB1122-REG-DETALHE")
    det = translate_group(det_group, line)

        # line = f.read(BLOCK_SIZE)
        # header_group = copybook.get_root_group("DEB1122-REG-HEADER")
        #
        # headers = translate_group(header_group, line)
        # print(headers)
        #
        # det_group = copybook.get_root_group("DEB1122-REG-DETALHE")
        #
        # for i in range(5):
        # # while line := f.read(BLOCK_SIZE):
        #     line = f.read(BLOCK_SIZE)
        #     det = translate_group(det_group, line)
        #     pprint(det)
