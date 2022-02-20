import { Line } from "./Line";
import { NodeType } from "./NodeType";

export class Input extends Line {
  json: any = {}; //json
  answer: any;

  constructor(id: string, json: any,  filePath: string, line: number) {
    super(id, NodeType.INPUT, filePath, line);
    this.json = json;
  }

  static deserialize(json: any): Input {
    let input = new Input(json.id, json.json, json.filePath, json.line);
    return input;
  }

  provideAnInput(answer: any) {
    this.answer = answer;
  }
}
