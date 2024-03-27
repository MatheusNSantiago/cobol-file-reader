from array import array
import re
import struct
import decimal
from parser import CopybookParser


# VER: https://gist.github.com/zorchenhimer/fd4d4208312d4175d106
def unpack_comp_3(p):
    a = array("B", p)
    v = float(0)

    # For all but last digit (half byte)
    for i in a[:-1]:
        v = (v * 100) + (((i & 0xF0) >> 4) * 10) + (i & 0xF)

    # Last digit
    i = a[-1]
    v = (v * 10) + ((i & 0xF0) >> 4)

    # Negative/Positve check.
    if (i & 0xF) == 0xD:
        v = -v

    # Decimal points are determined by a COBOL program's PICtrue clauses, not
    # the data on disk.
    return int(v)


def get_size_of_comp(n):
    if n in range(1, 5):  # [1, 4]
        return 2
    if n in range(5, 10):  # [5, 9]
        return 4
    if n in range(10, 19):  # [10, 18]
        return 8


def unpack_comp(p):
    return struct.unpack(">i", p)[0]


if __name__ == "__main__":
    parser = CopybookParser("copy.cpy")

    descriptions = parser.get_data_description()

    for desc in descriptions[:3]:
        _type = desc["type"]
        comp = desc["comp"]

        digits = re.search(r"9+\(\d+\)", _type)
        if not digits:
            continue
        digits = int(digits.group(0))

        if comp == "COMP-3":
            size = (digits // 2) + 1
        if comp == "COMP":
            size = get_size_of_comp(digits)
        if comp is None:
            size = digits


        # print(f"name{desc['name']}: {size}")

    # f = open("UT-S-ACH601S", "rb")
    # f.seek(10)
    # comp = f.read(4)

    # convert hex to decimal
    # print(struct.unpack(">i", comp)[0])

    # f.close()
