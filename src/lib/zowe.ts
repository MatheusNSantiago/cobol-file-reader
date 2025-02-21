import * as fs from "fs";
import path from "path/posix";
import * as vscode from "vscode";

// export namespace Zowe {
//   const getZowe = async () => {
//     const zoweExplorerApi = vscode.extensions.getExtension(
//       "Zowe.vscode-extension-for-zowe",
//     );
//
//     if (zoweExplorerApi?.exports) {
//       return zoweExplorerApi.exports;
//     }
//     return undefined;
//   };
//
//   export const getMvsApi = async () => {
//     const zoweExplorerApi = await getZowe();
//     if (!zoweExplorerApi) {
//       return "Instale a extensão do Zowe em sua máquina.";
//     }
//     const api = zoweExplorerApi.getExplorerExtenderApi();
//     const profile = api.getProfilesCache().loadNamedProfile("rse");
//     const mvsApi = zoweExplorerApi.getMvsApi(profile);
//     if (mvsApi.getSession().ISession.user === undefined) {
//       return "Faça login no zowe.";
//     }
//
//     return mvsApi;
//   };
// }

class _Zowe {
  private api: any = null;
  private profile: any = null;

  constructor() {}

  public async initialize(): Promise<void> {
    const zoweExplorerApi = await this.getZowe();
    if (!zoweExplorerApi) {
      throw new Error("Instale a extensão do Zowe em sua máquina.");
    }
    this.api = zoweExplorerApi;

    this.profile = zoweExplorerApi
      .getExplorerExtenderApi()
      .getProfilesCache()
      .loadNamedProfile("rse");
  }

  public async readDataset(dataset: string) {
    const filePath = path.join(__dirname, "randomness-stuff0x389");
    const options = {
      localEncoding: "UTF-8",
      encoding: "IBM-037",
      file: filePath,
      overwrite: true,
    };
    await this.mvsApi.getContents(dataset, options);

    const content = fs.readFileSync(filePath, { encoding: "utf-8" });
    fs.rmSync(filePath, { force: true });

    return content;
  }

  private async getZowe() {
    const zoweExplorerApi = vscode.extensions.getExtension(
      "Zowe.vscode-extension-for-zowe",
    );

    if (zoweExplorerApi?.exports) {
      return zoweExplorerApi.exports;
    }
    return undefined;
  }

  private get mvsApi() {
    return this.api.getMvsApi(this.profile);
  }
}

export const Zowe = new _Zowe();
