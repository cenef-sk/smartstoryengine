import { Option } from "./Option";
import { Line } from "./Line";
import { NodeType } from "./NodeType";

export class Branch extends Line{
  options: Option[] = [];
  choice: any;

  constructor(id: string, filePath: string, line: number) {
    super(id, NodeType.BRANCH, filePath, line);
  }

  addOption(option: Option){
    this.options = this.options.concat(option);
  }

  static deserialize(json: any): Branch {
    let branch = new Branch(json.id, json.filePath, json.line);
    branch.options = json.options.map((item: any) => {
      return Option.deserialize(item)
    })
    branch.deserialize(json);
    return branch;
  }
  makeAChoice(choice: number){
    this.choice = choice;
  }
}
