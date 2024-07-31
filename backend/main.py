from fastapi import FastAPI
from time import time
from fastapi.middleware.cors import CORSMiddleware

from converter import extract_record
from copybook import Copybook

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
    copybook_path = f"./sample-data/copybook/{copybook}.cpy"
    copybook: Copybook = Copybook(copybook_path)

    root: dict = copybook.get_root_group(group_name)

    # Traduz o arquivo para colunas de uma tabela
    with open(f"./sample-data/files/{file}", "rb") as f:
        records = [
            extract_record(root, line)
            for line in iter(lambda: f.read(root["bytes"]), b"")
            if line not in [b"", b"\n"]
        ]

    columns = [rec["name"] for rec in copybook.get_leaf_records_for_group(root)]
    rows = [[rec[col] for col in columns] for rec in records]

    return {"columns": columns, "rows": rows}


# file = "BRT.DEB.DEB1122.D240118.D310.SS000110";
# copybook = "DEBK1122";
# group = "DEB1122-REG-DETALHE";
# res = get_groups(copybook)
# print(res)


# group = "601-REG-GERAL"
# file = "BRT.DEB.DEB601.BAIXA.SS000101"
# copybook = "DEBK601"
# res = get_group(group, file, copybook)
# print(res)

group = "DCLTDEB307"
file = "BRT.DEB.DEB307.BAIXA.SS000101"
copybook = "DEBK307"

start = time()
res = get_records(group, file, copybook)
end = time()

print(res["rows"][-1])
# print(f"{len(res["rows"]):_}")
print(f"total: {end - start:.2f} segundos")
