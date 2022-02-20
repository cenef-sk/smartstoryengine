// every command line can inherite from this class

import { Serializable } from "./Serializable";

// for tagging and debuging purposes
export class Line extends Serializable {
  line: number;
  filePath: string;
  tags: string[] = [];
  constructor(id: string, className: string, filePath: string, line: number) {
    super(id, className);
    this.filePath = filePath;
    this.line = line;
  }
  addTag(tag: string){
    this.tags = this.tags.concat(tag);
  }
  deserialize(json: any): void {
    this.tags = json.tags;
  }
}
