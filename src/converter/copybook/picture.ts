export class Picture {
  level: string;
  name: string;
  children: Picture[];
  dataType?: string;
  bytes: number;
  isGroup: boolean;
  redefines?: string;
  occurs?: number;

  constructor({
    level,
    name,
    children = [],
    dataType,
    bytes = 0,
    isGroup = true,
    redefines,
    occurs,
  }: {
    level: string;
    name: string;
    children?: Picture[];
    dataType?: string;
    bytes: number;
    isGroup: boolean;
    redefines?: string;
    occurs?: number;
  }) {
    this.level = level;
    this.name = name;
    this.children = children;
    this.dataType = dataType;
    this.bytes = bytes;
    this.isGroup = isGroup;
    this.redefines = redefines;
    this.occurs = occurs;
  }

  isFiller(): boolean {
    return this.name === "FILLER";
  }

  calculateSize(calculateChildSize: (child: Picture) => number): number {
    if (!this.isGroup) {
      return this.bytes;
    }

    this.bytes = 0;
    for (const child of this.children) {
      const nbytes = calculateChildSize(child);
      this.bytes += nbytes;
    }

    this.bytes *= this.occurs || 1;
    return this.bytes;
  }

  getLeafPictures(includeFiller: boolean = false): Picture[] {
    const getLeafPicturesRecursive = (node: Picture): Picture[] => {
      const isN88 = node.level === "88";
      const hasChildren = node.children.length > 0;
      const isArray = node.occurs !== null && node.occurs !== undefined;

      if (isArray) {
        const leafPictures: Picture[] = [];
        for (let i = 0; i < (node.occurs || 0); i++) {
          for (const child of node.children) {
            leafPictures.push(...getLeafPicturesRecursive(child));
          }
        }
        return leafPictures;
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

      const leafPictures: Picture[] = [];
      for (const child of node.children) {
        leafPictures.push(...getLeafPicturesRecursive(child));
      }
      return leafPictures;
    };

    return getLeafPicturesRecursive(this);
  }
}
