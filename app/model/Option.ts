import { StoryWorld } from "../StoryWorld";
import { Expression } from "./Expression";
import { ExpressionEvaluator } from "./ExpressionEvaluator";
import { Jump } from "./Jump";
import { Line } from "./Line";
import { NodeType } from "./NodeType";
import { TextContent } from "./TextContent";

export class Option extends Line {
  condition: Expression|null;
  textOption: (Expression | TextContent)[];
  textResponse: (Expression | TextContent)[];
  jump: Jump|null;

  constructor(id: string, textOption: (Expression | TextContent)[],
  textResponse: (Expression | TextContent)[], condition: Expression|null, jump: Jump|null, filePath: string, line: number) {
    super(id, NodeType.OPTION, filePath, line)
    this.textOption = textOption;
    this.textResponse = textResponse;
    this.condition = condition;
    this.jump = jump;
  }

  static deserialize(json: any): Option {
    let condition: Expression|null = null;
    if (json.condition) {
      condition = Expression.deserialize(json.condition);
    }
    let jump: Jump|null = null;
    if (json.jump) {
      jump = Jump.deserialize(json.jump);
    }
    let textOption = []
    if (json.textOption) {
      textOption = json.textOption.map((item: any) => {
        switch(item.className) {
          case NodeType.TEXT_CONTENT:
            return TextContent.deserialize(item)
          case NodeType.EXPRESSION:
            return Expression.deserialize(item)
          default:
            throw new Error("Unallowed type of node!")
        }
      })
    }
    let textResponse = []
    if (json.textResponse) {
      textResponse = json.textResponse.map((item: any) => {
        switch(item.className) {
          case NodeType.TEXT_CONTENT:
            return TextContent.deserialize(item)
          case NodeType.EXPRESSION:
            return Expression.deserialize(item)
          default:
            throw new Error("Unallowed type of node!")
        }
      })
    }

    let option = new Option(json.id, textOption, textResponse, condition, jump, json.filePath, json.line);
    option.deserialize(json);
    return option;
  }
  evaluateText(text: (Expression | TextContent)[], world: StoryWorld): string{
    return text.reduce((prev, curr) => {
      if (curr instanceof TextContent) {
        return(prev + curr.text)
      } else if (curr instanceof Expression) {
        let ee = new ExpressionEvaluator();
        let value = ee.eval(world, curr.children)[1]
        return prev + value;
      } else {
        return prev
      }
    }, "")
  }
  option(world: StoryWorld): string{
    return this.evaluateText(this.textOption, world);
  }
  response(world: StoryWorld): string{
    return this.evaluateText(this.textResponse, world);
  }
}
// wave branch could be internal jump to specific id???
