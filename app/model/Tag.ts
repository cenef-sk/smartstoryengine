import { Line } from "./Line";
import { NodeType } from "./NodeType";

export class Tag {
  name: string = "";
  value: string = "";

  constructor(text: string) {
    this.name = text;
    // TODO parse text
  }
}
