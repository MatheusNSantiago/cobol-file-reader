import { Picture } from "./picture";
import { CopybookParser } from "./copybook-parser";

export class Copybook {
  pictures: Picture[];

  constructor(pictures: Picture[]) {
    this.pictures = pictures;
    for (const root of this.pictures) {
      root.calculateSize((child) => child.calculateSize((c) => c.bytes));
    }
  }

  static fromPath(path: string): Copybook {
    const copybookParser = new CopybookParser(path);
    const pictures = copybookParser.extractPictures();
    return new Copybook(pictures);
  }

  getRootGroup(name: string): Picture | undefined {
    for (const picture of this.getRootGroups()) {
      if (picture.name === name) {
        return picture;
      }
    }
    return undefined;
  }

  getRootGroups(): Picture[] {
    const rootGroups: Picture[] = [];
    for (let idx = 0; idx < this.pictures.length; idx++) {
      const group = this.pictures[idx];
      if (group.name === "FILLER") {
        continue;
      }

      if (group.redefines) {
        const redefinedPic = this.pictures.find(
          (rec) => rec.name === group.redefines,
        );
        if (redefinedPic) {
          group.bytes = redefinedPic.bytes;
        }
      }

      if (!group.children.length) {
        if (idx + 1 < this.pictures.length) {
          const nextGroup = this.pictures[idx + 1];
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
