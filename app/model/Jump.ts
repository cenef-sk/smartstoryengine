import { Line } from "./Line";
import { NodeType } from "./NodeType";

export class Jump extends Line {
  name: string = "";

  constructor(id: string, name: string, filePath: string, line: number) {
    super(id, NodeType.JUMP, filePath, line);
    this.name = name;
  }
  static deserialize(json: any): Jump {
    let jump = new Jump(json.id, json.name, json.filePath, json.line);
    jump.deserialize(json);
    return jump;
  }
}
