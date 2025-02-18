import { Record } from "./record";
import { CopybookParser } from "./copybook-parser";

export class Copybook {
  records: Record[];

  constructor(records: Record[]) {
    this.records = records;
    for (const root of this.records) {
      root.calculateSize((child) => child.calculateSize((c) => c.bytes));
    }
  }

  static fromPath(path: string): Copybook {
    const copybookParser = new CopybookParser(path);
    const records = copybookParser.extractRecords();
    return new Copybook(records);
  }

  getRootGroup(name: string): Record | undefined {
    for (const record of this.get_root_groups()) {
      if (record.name === name) {
        return record;
      }
    }
    return undefined;
  }

  get_root_groups(): Record[] {
    const rootGroups: Record[] = [];
    for (let idx = 0; idx < this.records.length; idx++) {
      const group = this.records[idx];
      if (group.name === "FILLER") {
        continue;
      }

      if (group.redefines) {
        const redefinedRecord = this.records.find((rec) => rec.name === group.redefines);
        if (redefinedRecord) {
          group.bytes = redefinedRecord.bytes;
        }
      }

      if (!group.children.length) {
        if (idx + 1 < this.records.length) {
          const nextGroup = this.records[idx + 1];
          if (nextGroup.isFiller() && nextGroup.redefines === group.name) {
            group.children = nextGroup.children;
          } else {
            continue;
          }
        }
      }

      rootGroups.push(group);
    }

    return rootGroups;
  }

  getGroupSize(groupName: string): number | undefined {
    const group = this.getRootGroup(groupName);
    return group ? group.bytes : undefined;
  }
}
