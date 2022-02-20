import { Branch } from "./Branch";
import { End } from "./End";
import { Input } from "./Input";
import { Jump } from "./Jump";
import { Line } from "./Line";
import { NodeType } from "./NodeType";
import { Paragraph } from "./Paragraph";

export class SubSection extends Line{
  name: string = "";
  content: (Paragraph|Branch|Input|Jump|End)[] = []; // ordered list of content

  constructor(id: string, name: string, filePath: string, line: number) {
    super(id, NodeType.SUBSECTION, filePath, line)
    this.name = name;
  }

  addContent(item: Paragraph|Branch|Input|Jump|End){
    this.content = this.content.concat(item);
  }

  static deserialize(json: any): SubSection {
    let subSection = new SubSection(json.id, json.name, json.filePath, json.line);
    subSection.content = json.content.map((item: any) => {
      switch(item.className) {
        case NodeType.JUMP:
          return Jump.deserialize(item)
        case NodeType.BRANCH:
          return Branch.deserialize(item)
        case NodeType.PARAGRAPH:
          return Paragraph.deserialize(item)
        case NodeType.INPUT:
          return Input.deserialize(item)
        case NodeType.END:
          return End.deserialize(item)
        default:
          throw new Error("Unallowed type of node!")
      }
    })
    subSection.deserialize(json);
    return subSection;
  }
}
