import { Line } from "./Line";
import { NodeType } from "./NodeType";

export class Empty extends Line {

  constructor(id: string, filePath: string, line: number) {
    super(id, NodeType.EMPTY, filePath, line)
  }
}
