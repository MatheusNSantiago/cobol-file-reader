import type { SyntaxNode, Tree } from "tree-sitter";
import { Picture } from "./picture";
import * as fs from "fs";
import Parser, { Query } from "tree-sitter";
import TSCopybook from "tree-sitter-copybook";

interface Capture {
  [key: string]: SyntaxNode;
}

export class CopybookParser {
  private source: string;
  private parser: Parser;
  private tree: Tree;
  private language: any;

  constructor(path: string) {
    this.source = fs.readFileSync(path, "utf-8");
    const TSParser = require("tree-sitter");
    this.parser = new Parser();
    this.parser = new TSParser();
    this.language = TSCopybook;

    this.parser.setLanguage(this.language);
    this.tree = this.parser.parse(this.source);
  }

  static parse(copybookPath: string): CopybookParser {
    return new CopybookParser(copybookPath);
  }

  public extractPictures(): Picture[] {
    const dataDescriptions = this.match("(data_description) @c");
    const captureQuery = `(data_description
                               level: (_) @level
                               name:  (_) @name
                               redefines: (_)? @redefines
                               type:  (type
                                          def:  (_) @def
                                          comp: (_)? @comp)?
                               occurs: (_)? @occurs)`;
    const captures = dataDescriptions.map((data) =>
      this.capture(captureQuery, data),
    );

    const pictures = captures.map((capture) =>
      this.makePictureFromCapture(capture),
    );

    return this.transformToHierarchy(pictures);
  }

  private makePictureFromCapture(capture: Capture): Picture {
    const level = this.extractText(capture["level"])!;
    const name = this.extractText(capture["name"])!;
    const picDef = this.extractText(capture["def"]);
    const comp = this.extractText(capture["comp"]);
    const redefines = this.extractText(capture["redefines"]);
    const occurs = this.extractInt(capture["occurs"]);
    const isGroup = picDef === undefined;

    let dataType: string | undefined;
    let bytes = 0;

    if (picDef) {
      dataType = this.assignDataTypeToPicture(picDef, comp);
      bytes = this.calculatePictureSizeInBytes(picDef, dataType);
    }


    return new Picture({
      level,
      name,
      dataType,
      bytes,
      isGroup,
      redefines,
      occurs,
    });
  }

  private extractText(node: SyntaxNode | undefined) {
    if (node) return node.text.toUpperCase();
  }

  private extractInt(node: SyntaxNode | undefined) {
    if (node) return parseInt(node.text);
  }

  private match(query: string, root?: SyntaxNode): SyntaxNode[] {
    root = root || this.tree.rootNode;
    const compiledQuery = new Query(this.language, query);
    const matches: SyntaxNode[] = [];

    compiledQuery.matches(root).forEach((match: any) => {
      match.captures.forEach((capture: any) => {
        matches.push(capture.node);
      });
    });
    return matches;
  }

  private capture(query: string, root?: SyntaxNode): Capture {
    const compiledQuery = new Query(this.language, query);
    const rootNode = root || this.tree.rootNode;
    const captures: Capture = {};

    compiledQuery.captures(rootNode).forEach((capture: any) => {
      captures[capture.name] = capture.node;
    });

    return captures;
  }

  private assignDataTypeToPicture(
    picDef: string,
    comp: string | undefined,
  ): string {
    const firstChar = picDef[0];

    if (comp === "COMP-3" && firstChar === "S") return "pd+";
    if (comp === "COMP-3") return "pd";
    if (comp === "COMP" && firstChar === "S") return "bi+";
    if (comp === "COMP") return "bi";
    if (firstChar === "S") return "zd+";
    if (firstChar === "9") return "zd";

    return "ch";
  }

  private calculatePictureSizeInBytes(
    picDef: string,
    dataType: string,
  ): number {
    const firstChar = picDef[0];
    const parts = picDef
      .replace("V", " ")
      .replace("S", "")
      .replace("-", "")
      .split(" ");

    function getPicSize(arg: string): number {
      if (arg.includes("(")) {
        return parseInt(arg.substring(arg.indexOf("(") + 1, arg.indexOf(")")));
      }

      return arg.length;
    }

    let length = getPicSize(parts[0]);

    if (parts.length === 2 && firstChar !== "V") {
      length += getPicSize(parts[1]);
    }

    if (dataType.includes("pd")) return Math.floor(length / 2) + 1;

    if (dataType.includes("bi")) {
      if (length < 5) return 2;
      if (length < 10) return 4;
      return 8;
    }

    if (firstChar === "-") length += 1;
    return length;
  }

  private transformToHierarchy(pictures: Picture[]): Picture[] {
    const roots: Picture[] = [];
    const stack: Picture[] = [];

    for (const picture of pictures) {
      if (!stack.length) {
        roots.push(picture);
        stack.push(picture);
        continue;
      }

      while (stack.length && picture.level <= stack[stack.length - 1].level) {
        stack.pop();
      }

      if (stack.length) {
        stack[stack.length - 1].children.push(picture);
      } else {
        roots.push(picture);
      }
      stack.push(picture);
    }

    return roots;
  }
}
