import { Line } from "./Line";
import { NodeType } from "./NodeType";

export enum ExpressionType {
  STRING = "STRING",
  NUMBER = "NUMBER",
  BOOLEAN = "BOOLEAN",

  VARIABLE = "VARIABLE",
  KEY_WORD = "KEY_WORD",
  OPERATOR = "OPERATOR",
  FUNCTION = "FUNCTION",
  NESTED_INDEX = "NESTED_INDEX",
  NESTED_EXPRESSION = "NESTED_EXPRESSION"
}

export class Expression extends Line {
  text: string;
  type: ExpressionType;
  children: Expression[] = [];
  // valueTriggers
  // externalMethods

  constructor(text: string, type: ExpressionType) {
    super("unknown", NodeType.EXPRESSION, "unknown", -1) // TODO filePath and line
    this.text = text;
    this.type = type;
  }
  addChild(child: Expression){
    this.children = this.children.concat(child);
  }
  addChildren(children: Expression[]){
    this.children = this.children.concat(children);
  }

  static deserialize(json: any): Expression {
    let expression = new Expression(json.text, json.type);
    json.children.forEach((child: any) => {
      expression.addChild(
        Expression.deserialize(child)
      );
    })
    return expression;
  }
}
