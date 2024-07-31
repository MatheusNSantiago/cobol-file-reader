from typing import Any

import numpy as np
from numba import njit


def extract_record(group: dict, line: bytes):
    """
    Transforma uma linha de bytes em campos legíveis seguindo a estrutura descrita no grupo

    Parâmetros:
    group (dict): Representa a estrutura do grupo.
    line (bytes): Linha de bytes a ser traduzida.

    Retorna:
    dict[str, str]]: Nome dos campo e seu conteúdo traduzido.
    """
    result: dict[str, Any] = {}

    curr_byte = 0
    for child in group["children"]:
        name = child["name"]
        offset = child["bytes"]
        data_type = child["data_type"]

        _bytes = line[curr_byte : curr_byte + offset]
        # byte_array = np.array(_bytes, dtype=np.uint8)
        content = ''
        # content = translate_bytes(byte_array, data_type)

        if "FILLER" not in name:
            result[name] = content

        curr_byte += offset

    return result


@njit
def translate_bytes(_bytes: np.ndarray, data_type: str):
    return ""
    # # ch: text  - x
    # # zd: zoned - 9
    # def unpack_text_and_number():
    #     return _bytes.decode("cp037").replace("\x00", "").rstrip()
    #
    # # pd : packed-decimal       :  9 COMP-3
    # # pd+: signed packed-decimal: S9 COMP-3
    # def unpack_decimal():
    #     # No packed decimal, os ultimos 4 bits (1/2 byte) representam o sinal
    #     last_half_byte = _bytes.hex()[-1:]
    #
    #     has_sign = last_half_byte in ["d", "b"]
    #     sign = "-" if has_sign else ""
    #     unsigned_value = _bytes.hex()[:-1]
    #
    #     return sign + unsigned_value
    #
    # # bi : binary       :  9 COMP
    # def unpack_binary():
    #     hex_str = _bytes.hex() if _bytes else "0"
    #     return str(int("0x" + hex_str, 0))
    #
    # # bi+: signed binary: S9 COMP
    # def unpack_signed_binary():
    #     hex_str = _bytes.hex() if _bytes else "0"
    #     value = int("0x" + hex_str, 0)
    #
    #     max_hex = "0x" + ("f" * len(_bytes.hex()))  # FFFF...F
    #     max_value = int(max_hex, 0) + 1
    #
    #     return str(value - max_value)
    #
    # # zd+: signed zoned: S9
    # def unpack_signed_number():
    #     hex_str = _bytes.hex()
    #     last_byte = hex_str[-2:-1]
    #
    #     sign = "" if last_byte != "d" else "-"
    #     unsigned_value = _bytes[:-1].decode("cp037")
    #     last_half_byte = hex_str[-1:]
    #
    #     return sign + unsigned_value + last_half_byte
    #
    # match data_type:
    #     case "ch" | "zd":
    #         return unpack_text_and_number()
    #     case "pd" | "pd+":
    #         return unpack_decimal()
    #     case "bi":
    #         return unpack_binary()
    #     case "bi+":
    #         max_positive_hex = "7fffffffffffffffffff"
    #         is_positive = _bytes.hex() <= max_positive_hex[: len(_bytes.hex())]
    #         if is_positive:
    #             return unpack_binary()
    #         else:
    #             return unpack_signed_binary()
    #     case "zd+":
    #         return unpack_signed_number()


# def translate_bytes(_bytes: bytearray, description):
#     data_type = description["data_type"]
#     hex = _bytes.hex()
#
#     # ch: text  - x
#     # zd: zoned - 9
#     if data_type in ["ch", "zd"]:
#         return _bytes.decode("cp037").replace("\x00", "").rstrip()
#
#
#     #  pd : packed-decimal       :  9 COMP-3
#     #  pd+: signed packed-decimal: S9 COMP-3
#     if data_type in ["pd", "pd+"]:
#         # No packed decimal, os ultimos 4 bits (1/2 byte) representam o sinal
#         last_half_byte = hex[-1:]
#
#         is_positive = last_half_byte == "d"
#         is_negative = last_half_byte == "b"
#
#         sign = "" if not (is_positive or is_negative) else "-"
#         unsigned_value = hex[:-1]
#
#         return sign + unsigned_value
#
#     #  bi : binary       :  9 COMP
#     #  bi+: signed binary: S9 COMP
#     if data_type == "bi" or (
#         data_type == "bi+" and hex <= HighestPositive[: len(_bytes) * 2]
#     ):
#         hex = "0x" + hex if _bytes else "0x0"
#         return str(int(hex, 0))
#
#     # bi+: signed binary: S9 COMP
#     if data_type == "bi+":
#         hex = "0x" + hex if _bytes else "0x0"
#         return str(int(hex, 0) - int("0x" + len(_bytes) * 2 * "f", 0) - 1)
#
#     # zd+: signed zoned: S9
#     if data_type == "zd+":
#         last_byte = hex[-2:-1]
#
#         sign = "" if last_byte != "d" else "-"
#         unsigned_value = _bytes[:-1].decode("cp037")
#         last_half_byte = hex[-1:]
#
#         return sign + unsigned_value + last_half_byte
