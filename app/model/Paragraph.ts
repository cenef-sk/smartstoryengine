import { StoryWorld } from "../StoryWorld";
import { Empty } from "./Empty";
import { Expression } from "./Expression";
import { ExpressionEvaluator } from "./ExpressionEvaluator";
import { Line } from "./Line";
import { NodeType } from "./NodeType";
import { Tag } from "./Tag";
import { TextContent } from "./TextContent";

export class Paragraph extends Line {
  content: (Empty|TextContent|Expression)[] = []; // ordered list paragraphs

  constructor(id: string, filePath: string, line: number) {
    super(id, NodeType.PARAGRAPH, filePath, line)
  }

  addContent(content: (Empty|TextContent|Expression|Tag)[]) {
    content.forEach(item => {
      if (item instanceof Tag) {
        this.tags = this.tags.concat(item.name);
      } else {
        this.content = this.content.concat(item);
      }
    })
  }

  static deserialize(json: any): Paragraph {
    let paragraph = new Paragraph(json.id, json.filePath, json.line);
    paragraph.content = json.content.map((item: any) => {
      if (!item) {
        console.log(json)
      }
      switch(item.className) {
        // case NodeType.EMPTY:
        //   return Empty.deserialize(item)
        case NodeType.TEXT_CONTENT:
          return TextContent.deserialize(item)
        case NodeType.EXPRESSION:
          return Expression.deserialize(item)
        default:
          throw new Error("Unallowed type of node!")
      }
    })
    paragraph.deserialize(json);
    return paragraph;
  }
  eval(world: StoryWorld): string {
    return this.content.reduce((prev: any, curr) => {
      if (curr instanceof TextContent) {
        return prev + curr.text;
      } else if (curr instanceof Expression) {
        let ee = new ExpressionEvaluator();
        let value = ee.eval(world, curr.children)[1]
        return prev + value;
      } else {
        return prev;
      }
    }, "")
  }
}
