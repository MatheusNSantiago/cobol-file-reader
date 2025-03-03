import cptable from "codepage";
import { Picture } from "./copybook/picture";
import * as fs from "fs";

interface RecordResult {
  [key: string]: any;
}

/**
 * Extrai registros de um arquivo com base no copybook fornecido
 *
 * @param groupPic - A picture raiz (grupo) que define a estrutura dos dados.
 * @param filePath - O caminho para o arquivo de onde extrair os registros.
 * @returns Um array de RecordResult, cada um representando um registro extraído do arquivo.
 * @throws Se houver um erro ao ler o arquivo.
 */
export function extractRecordsFromFile(
  groupPic: Picture,
  filePath: string,
): RecordResult[] {
  var data: Buffer;
  try {
    data = fs.readFileSync(filePath);
  } catch (err) {
    console.error("Erro ao ler arquivo:", err);
    throw err;
  }

  const lines: Buffer[] = [];
  let start = 0;
  while (start < data.length) {
    const line = data.subarray(start, start + groupPic.bytes);
    if (line.length === 0) {
      break;
    }
    lines.push(line);
    if (lines.length > 5_000) {
      break;
    }
    start += groupPic.bytes;
  }

  const leafPictures = groupPic.getLeafPictures(true);
  return lines.map((line) => extractPicture(leafPictures, line));
}

/**
 * Extrai um único registro de uma linha de bytes, com base nos registros folha.
 *
 * @param leafPictures - Um array de leaft pictures que definem a estrutura do registro.
 * @param line - Um Buffer representando uma única linha de bytes do arquivo.
 * @returns Um objeto RecordResult representando o registro extraído.
 */
function extractPicture(leafPictures: Picture[], line: Buffer): RecordResult {
  const result: RecordResult = {};
  let currByte = 0;

  for (const child of leafPictures) {
    const name = child.name;
    const offset = child.bytes;
    const isArray = child.occurs !== undefined;

    if (!isArray) {
      const dataType = child.dataType;
      const bytes = line.subarray(currByte, currByte + offset);
      const content = deserializeBytes(bytes, dataType);

      if (!child.isFiller()) {
        result[name] = content;
      }
    }

    currByte += offset;
  }

  return result;
}

function deserializeBytes(bytes: Buffer, dataType: string | undefined): string {
  function unpackTextAndNumber(): string {
    return Buffer.from(cptable.utils.decode(37, bytes)).toString();
  }

  function unpackDecimal(): string {
    const hexStr = bytes.toString("hex");
    const lastHalfByte = hexStr.slice(-1);

    const hasSign = ["d", "b"].includes(lastHalfByte);
    const sign = hasSign ? "-" : "";

    let unsignedValue = hexStr.slice(0, -1);
    if (unsignedValue !== "0") {
      unsignedValue = unsignedValue.replace(/^0+/, "");
    }

    return sign + unsignedValue;
  }

  function unpackBinary(): string {
    const hexStr = bytes.length > 0 ? bytes.toString("hex") : "0";
    return parseInt("0x" + hexStr, 16).toString();
  }

  function unpackSignedBinary(): string {
    const hexStr = bytes.length > 0 ? bytes.toString("hex") : "0";
    let value = parseInt("0x" + hexStr, 16);

    const maxHex = "0x" + "f".repeat(bytes.toString("hex").length);
    const maxValue = parseInt(maxHex, 16) + 1;

    return (value - maxValue).toString();
  }

  function unpackSignedNumber(): string {
    const hexStr = bytes.toString("hex");
    const lastByte = hexStr.slice(-2, -1);

    const sign = lastByte !== "d" ? "" : "-";
    // const unsignedValue = bytes.subarray(0, -1).toString("ascii");
    const unsignedValue = Buffer.from(
      cptable.utils.decode(37, bytes.subarray(0, -1)),
    ).toString();

    const lastHalfByte = hexStr.slice(-1);

    return sign + unsignedValue + lastHalfByte;
  }

  switch (dataType) {
    case "ch":
    case "zd":
      return unpackTextAndNumber();
    case "pd":
    case "pd+":
      return unpackDecimal();
    case "bi":
      return unpackBinary();
    case "bi+":
      const maxPositiveHex = "7fffffffffffffffffff";
      const isPositive =
        bytes.toString("hex") <=
        maxPositiveHex.slice(0, bytes.toString("hex").length);
      if (isPositive) {
        return unpackBinary();
      } else {
        return unpackSignedBinary();
      }
    case "zd+":
      return unpackSignedNumber();
    default:
      return "";
  }
}
