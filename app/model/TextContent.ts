import { Line } from "./Line";
import { NodeType } from "./NodeType";

export class TextContent extends Line {
  text: string = "";

  constructor(id: string, text: string, filePath: string, line: number) {
    super(id, NodeType.TEXT_CONTENT, filePath, line);
    this.text = text;
  }
  static deserialize(json: any): TextContent {
    let textContent = new TextContent(json.id, json.text, json.filePath, json.line);
    textContent.deserialize(json);
    return textContent;
  }
}
