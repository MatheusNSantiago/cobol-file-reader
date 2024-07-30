from typing import Any

HighestPositive = "7fffffffffffffffffff"


def extract_record(group: dict, line: bytes) -> dict[str, Any]:
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

        _bytes = line[curr_byte : curr_byte + offset]
        content = translate_bytes(_bytes, child)

        if "FILLER" not in name:
            result[name] = content

        curr_byte += offset

    return result


def translate_bytes(_bytes: bytearray, description):
    data_type = description["data_type"]

    # ch: text  - x
    # zd: zoned - 9
    if data_type in ["ch", "zd"]:
        return _bytes.decode("cp037").replace("\x00", "").rstrip()

    #  pd : packed-decimal       :  9 COMP-3
    #  pd+: signed packed-decimal: S9 COMP-3
    if data_type in ["pd", "pd+"]:
        # No packed decimal, os ultimos 4 bits (1/2 byte) representam o sinal
        last_half_byte = _bytes.hex()[-1:]

        is_positive = last_half_byte == "d"
        is_negative = last_half_byte == "b"

        sign = "" if not (is_positive or is_negative) else "-"
        unsigned_value = _bytes.hex()[:-1]

        return sign + unsigned_value

    #  bi : binary       :  9 COMP
    #  bi+: signed binary: S9 COMP
    if data_type == "bi" or (
        data_type == "bi+" and _bytes.hex() <= HighestPositive[: len(_bytes) * 2]
    ):
        hex_str = "0x" + _bytes.hex() if _bytes else "0x0"
        return str(int(hex_str, 0))

    # bi+: signed binary: S9 COMP
    if data_type == "bi+":
        hex_str = "0x" + _bytes.hex() if _bytes else "0x0"
        return str(int(hex_str, 0) - int("0x" + len(_bytes) * 2 * "f", 0) - 1)

    # zd+: signed zoned: S9
    if data_type == "zd+":
        last_byte = _bytes.hex()[-2:-1]

        sign = "" if last_byte != "d" else "-"
        unsigned_value = _bytes[:-1].decode("cp037")
        last_half_byte = _bytes.hex()[-1:]

        return sign + unsigned_value + last_half_byte
