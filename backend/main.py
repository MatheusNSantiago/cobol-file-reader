from fastapi import FastAPI
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
    copybook_path = f"./sample-data/copybook/{copybook}.cpy"
    return [
        group["name"]
        for group in Copybook(copybook_path).get_root_groups()
        if group.get("data_type") != None
    ]


@app.get("/")
def read_root(group_name: str, file: str, copybook: str):
    copybook_path = f"./sample-data/copybook/{copybook}.cpy"
    copybook: Copybook = Copybook(copybook_path)

    root: dict = copybook.get_root_group(group_name)

    # se for um registro geral (PIC X sem filhos), pega o primeiro grupo FILLER REDEFINES
    is_reg_geral = len(root["children"]) == 0
    if is_reg_geral:
        for group in copybook.get_root_groups():
            if group.get("redefines") == group_name:
                root = group

    # Traduz o arquivo para colunas de uma tabela
    with open(f"./sample-data/files/{file}", "rb") as f:
        records = [
            extract_record(root, line)
            for line in iter(lambda: f.read(root["bytes"]), b"")
        ][:100]

    columns = [rec["name"] for rec in copybook.get_leaf_records_for_group(root)]
    rows = [[rec[col] for col in columns] for rec in records]

    return {"columns": columns, "rows": rows}


# group = "DCLTDEB307"
# file = "BRT.DEB.DEB307.BAIXA.SS000101"
# copybook = "DEBK307"
# res = read_root(group, file, copybook)
