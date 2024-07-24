from pprint import pprint

from converter import translate_group
from copybook import Copybook
from file import File

if __name__ == "__main__":
    copybook = Copybook("./sample-data/copybooks/DEBK1122.cpy")

    det_group = copybook.get_root_group("DEB1122-REG-DETALHE")
    pprint(det_group)

    rec_lenght = copybook.get_record_length()
    file = File("./sample-data/files/BRT.DEB.DEB1122.D240118.D310.SS000110", rec_lenght)
    for line in file.lines:
        det = translate_group(det_group, line)

