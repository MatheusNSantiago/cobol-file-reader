import * as path from "path";
import { Copybook } from "./copybook/copybook";
import { extractRecordsFromFile } from "./extractor";

export async function getGroups(extensionPath: string, copybookName: string): Promise<string[]> {
  try {
    const copybook = Copybook.fromPath(
      path.join(extensionPath, "assets", "copybook", `${copybookName}.cpy`)
    );
    const groups = copybook
      .get_root_groups()
      .filter((group) => !group.isFiller() && group.children.length > 0)
      .map((group) => group.name);
    return groups;
  } catch (error: any) {
    console.error("Error processing copybook:", error);
    throw new Error(error.message); // Re-lançar o erro para ser tratado no frontend
  }
}

export async function getTableData(
  extensionPath: string,
  groupName: string,
  fileName: string,
  copybookName: string
): Promise<{ columns: string[]; rows: string[][] }> {
  try {
    const copybookPath = path.join(extensionPath, "assets", "copybook", `${copybookName}.cpy`);
    const copybook = Copybook.fromPath(copybookPath);

    const group = copybook.getRootGroup(groupName);

    if (!group) {
      throw new Error("Group not found");
    }

    const filePath = path.join(extensionPath, "assets", "files", fileName);
    const records = extractRecordsFromFile(group, filePath);

    const columns = group.getLeafRecords().map((rec) => rec.name);
    const rows = records.map((rec) => columns.map((col) => rec[col]));

    return { columns, rows };
  } catch (error: any) {
    console.error("Error processing request:", error);
    throw new Error(error.message);
  }
}
