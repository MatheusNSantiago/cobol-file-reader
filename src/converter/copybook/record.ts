export class Record {
  level: string;
  name: string;
  children: Record[];
  dataType?: string;
  bytes: number;
  isGroup: boolean;
  redefines?: string;
  occurs?: number;

  constructor(
    level: string,
    name: string,
    children: Record[] = [],
    dataType?: string,
    bytes: number = 0,
    isGroup: boolean = true,
    redefines?: string,
    occurs?: number
  ) {
    this.level = level;
    this.name = name;
    this.children = children;
    this.dataType = dataType;
    this.bytes = bytes;
    this.isGroup = isGroup;
    this.redefines = redefines;
    this.occurs = occurs;
  }

  toString(): string {
    return `Record(name='${this.name}', level='${this.level}', bytes=${this.bytes}, is_group=${this.isGroup})`;
  }

  isFiller(): boolean {
    return this.name === "FILLER";
  }

  calculateSize(calculateChildSizeFunc: (child: Record) => number): number {
    if (!this.isGroup) {
      return this.bytes;
    }

    this.bytes = 0;
    for (const child of this.children) {
      const nbytes = calculateChildSizeFunc(child);
      this.bytes += nbytes;
    }

    this.bytes *= this.occurs || 1;
    return this.bytes;
  }

  getLeafRecords(includeFiller: boolean = false): Record[] {
    const getLeafRecordsRecursive = (node: Record): Record[] => {
      const isN88 = node.level === "88";
      const hasChildren = node.children.length > 0;
      const isArray = node.occurs !== null && node.occurs !== undefined;

      if (isArray) {
        const leafRecords: Record[] = [];
        for (let i = 0; i < (node.occurs || 0); i++) {
          for (const child of node.children) {
            leafRecords.push(...getLeafRecordsRecursive(child));
          }
        }
        return leafRecords;
      }

      const isDefiningN88 = node.children.every((c) => c.level === "88");
      if (isDefiningN88 && !node.isFiller()) {
        return [node];
      }

      if (!(hasChildren || isN88)) {
        if (includeFiller || !node.isFiller()) {
          return [node];
        }
      }

      const leafRecords: Record[] = [];
      for (const child of node.children) {
        leafRecords.push(...getLeafRecordsRecursive(child));
      }
      return leafRecords;
    };

    return getLeafRecordsRecursive(this);
  }
}
