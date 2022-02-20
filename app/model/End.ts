import { Line } from "./Line";
import { NodeType } from "./NodeType";

export class End extends Line {

  constructor(id: string, filePath: string, line: number) {
    super(id, NodeType.END, filePath, line);
  }

  static deserialize(json: any): End {
    let end = new End(json.id, json.filePath, json.line);
    end.deserialize(json);
    return end;
  }
}
