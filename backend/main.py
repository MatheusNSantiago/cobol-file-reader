from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from converter import translate_group
from copybook import Copybook

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root(file: str, copybook: str):
    copybook_path = f"./sample-data/copybook/{copybook}.cpy"
    copybook: Copybook = Copybook(copybook_path)

    print(copybook.get_record_length())
    # with open(f"./sample-data/files/{file}", "rb") as f:
    #     rec_length = copybook.get_record_length()
    #     lines = [line for line in iter(lambda: f.read(rec_length), b"\n")]
    #
    # groups = []

    # for root in copybook.get_root_groups():
    #     is_reg_geral = len(root["children"]) == 0
    #     if is_reg_geral:
    #         continue
    #
    #     name = root["name"]
    #     columns = [r["name"] for r in copybook.get_leaf_records_for_group(name)]

    #     translated_records = [translate_group(root, line) for line in lines]
    #
    #     rows = []
    #     for rec in translated_records:
    #         values = [rec[col] for col in columns]
    #         rows.append(values)
    #
    #     group = {"name": name, "columns": columns, "rows": rows}
    #     groups.append(group)
    #
    # return {"groups": groups}
    #


file = "BRT.DEB.DEB1122.D240118.D310.SS000110"
copybook = "DEBK307"
res = read_root(file, copybook)
print(res)
