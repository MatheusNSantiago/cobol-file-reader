import type { SyntaxNode, Tree } from "tree-sitter";
import { Record } from "./record";
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

  extractRecords(): Record[] {
    const dataDescriptions = this._match("(data_description) @c");
    const captureQuery = `(data_description
                               level: (_) @level
                               name:  (_) @name
                               redefines: (_)? @redefines
                               type:  (type
                                          def:  (_) @def
                                          comp: (_)? @comp)?
                               occurs: (_)? @occurs)`;
    const captures = dataDescriptions.map((data) =>
      this._capture(captureQuery, data),
    );

    const records = captures.map((capture) =>
      this._createRecordFromCapture(capture),
    );

    return this.transformToHierarchy(records);
  }

  private _createRecordFromCapture(capture: Capture): Record {
    const level = this._extractText(capture["level"])!;
    const name = this._extractText(capture["name"])!;
    const picDef = this._extractText(capture["def"]);
    const comp = this._extractText(capture["comp"]);
    const redefines = this._extractText(capture["redefines"]);
    const occurs = this._extractInt(capture["occurs"]);

    const { dataType, bytesSize } = this._determineDataTypeAndSize(
      picDef,
      comp,
    );
    const isGroup = picDef === null || picDef === undefined;

    return new Record({
      level,
      name,
      dataType,
      bytes: bytesSize,
      isGroup,
      redefines,
      occurs,
    });
  }

  private _determineDataTypeAndSize(
    picDef: string | undefined,
    comp: string | undefined,
  ): { dataType: string | undefined; bytesSize: number } {
    if (picDef) {
      const dataType = this._assignDataType(picDef, comp);
      const bytesSize = this._calculateNumberOfBytes(picDef, dataType);
      return { dataType, bytesSize };
    } else {
      return { dataType: undefined, bytesSize: 0 };
    }
  }

  private _extractText(node: SyntaxNode | undefined) {
    if (node) return node.text.toUpperCase();
  }

  private _extractInt(node: SyntaxNode | undefined) {
    if (node) return parseInt(node.text);
  }

  private _match(query: string, root?: SyntaxNode): SyntaxNode[] {
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

  private _capture(query: string, root?: SyntaxNode): Capture {
    const compiledQuery = new Query(this.language, query);
    const rootNode = root || this.tree.rootNode;
    const captures: Capture = {};

    compiledQuery.captures(rootNode).forEach((capture: any) => {
      captures[capture.name] = capture.node;
    });

    return captures;
  }

  private _assignDataType(picDef: string, comp: string | undefined): string {
    const firstChar = picDef[0];

    if (comp === "COMP-3" && firstChar === "S") {
      return "pd+";
    }
    if (comp === "COMP-3") {
      return "pd";
    }
    if (comp === "COMP" && firstChar === "S") {
      return "bi+";
    }
    if (comp === "COMP") {
      return "bi";
    }
    if (firstChar === "S") {
      return "zd+";
    }
    if (firstChar === "9") {
      return "zd";
    }

    return "ch";
  }

  private _calculateNumberOfBytes(picDef: string, dataType: string): number {
    const firstChar = picDef[0];
    const parts = picDef
      .replace("V", " ")
      .replace("S", "")
      .replace("-", "")
      .split(" ");

    function getPicSize(arg: string): number {
      if (arg.includes("(")) {
        return parseInt(arg.substring(arg.indexOf("(") + 1, arg.indexOf(")")));
      } else {
        return arg.length;
      }
    }

    let length = getPicSize(parts[0]);

    if (parts.length === 2 && firstChar !== "V") {
      length += getPicSize(parts[1]);
    }

    if (dataType.includes("pd")) {
      return Math.floor(length / 2) + 1;
    } else if (dataType.includes("bi")) {
      if (length < 5) {
        return 2;
      } else if (length < 10) {
        return 4;
      } else {
        return 8;
      }
    } else {
      if (firstChar === "-") {
        length += 1;
      }
      return length;
    }
  }

  private transformToHierarchy(records: Record[]): Record[] {
    const roots: Record[] = [];
    const stack: Record[] = [];

    for (const record of records) {
      if (!stack.length) {
        roots.push(record);
        stack.push(record);
        continue;
      }

      while (stack.length && record.level <= stack[stack.length - 1].level) {
        stack.pop();
      }

      if (stack.length) {
        stack[stack.length - 1].children.push(record);
      } else {
        roots.push(record);
      }
      stack.push(record);
    }

    return roots;
  }
}
