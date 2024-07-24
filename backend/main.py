from converter import translate_group
from copybook import Copybook

if __name__ == "__main__":
    copybook = Copybook("./sample-data/copybooks/DEBK1122.cpy")

    det_group = copybook.get_root_group("DEB1122-REG-DETALHE")

    # Le o arquivo
    rec_length = copybook.get_record_length()
    with open("./sample-data/files/BRT.DEB.DEB1122.D240118.D310.SS000110", "rb") as f:
        lines = [line for line in iter(lambda: f.read(rec_length), b"\n")]

    for line in lines:
        det = translate_group(det_group, line)
