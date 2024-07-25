import pandas as pd
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
def read_root():
    copybook = Copybook("./sample-data/copybooks/DEBK1122.cpy")
    det_group = copybook.get_root_group("DEB1122-REG-DETALHE")

    rec_length = copybook.get_record_length()
    with open("./sample-data/files/BRT.DEB.DEB1122.D240118.D310.SS000110", "rb") as f:
        lines = [line for line in iter(lambda: f.read(rec_length), b"\n")]

    df = pd.DataFrame([translate_group(det_group, line) for line in lines])
    return df.to_json(index=False, orient="split")
