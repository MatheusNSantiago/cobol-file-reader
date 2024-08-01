import json
from pprint import pprint
from time import time

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from zstandard import ZstdCompressor

from converter import extract_records
from copybook import Copybook, get_leaf_records_for_group

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/groups")
def get_groups(copybook: str):
    copybook = Copybook(f"./sample-data/copybook/{copybook}.cpy")
    return [
        group["name"]
        for group in copybook.get_root_groups()
        if group.get("name") != "FILLER" and len(group["children"]) > 0
    ]


@app.get("/")
def get_records(group_name: str, file: str, copybook: str):
    start = time()
    copybook_path = f"./sample-data/copybook/{copybook}.cpy"
    copybook: Copybook = Copybook(copybook_path)

    group: dict = copybook.get_root_group(group_name)

    # # Traduz o arquivo para colunas de uma tabela
    with open(f"./sample-data/files/{file}", "rb") as fp:
        records = extract_records(group, fp)

    columns = [rec["name"] for rec in get_leaf_records_for_group(group)]
    rows = [[rec[col] for col in columns] for rec in records]
    result = {"columns": columns, "rows": rows}

    # Comprime o resultado
    result_bytes = json.dumps(result).encode("utf-8")
    result_compressed = ZstdCompressor().compress(result_bytes)
    end = time()

    print("================================")
    print("time:", end - start)
    print("================================")
    return Response(
        content=result_compressed,
        media_type="application/octet-stream",  # indica que é binario
        headers={"Content-Encoding": "zstd"},
    )


# file = "BRT.DEB.DEB1122.D240118.D310.SS000110";
# copybook = "DEBK1122";
# group = "DEB1122-REG-DETALHE";
# res = get_groups(copybook)
# print(res)


# group = "601-REG-FAIXA-A"
# # group = "601-REG-GERAL"
# file = "BRT.DEB.DEB601.BAIXA.SS000101"
# copybook = "DEBK601"
# res = get_records(group, file, copybook)
#
# foo = {}
# rows = res["rows"][0]
# for i, col in enumerate(res["columns"]):
#     foo[col] = rows[i]
#
# __import__('pprint').pprint(foo)
# print(foo["601A-MOV-ATL-AAAAMMDD"])
# print(foo["601A-MOV-ANT-AAAAMMDD"])

group = "DCLTDEB307"
file = "BRT.DEB.DEB307.BAIXA.SS000101"
copybook = "DEBK307"

res = get_records(group, file, copybook)
