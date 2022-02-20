import { InteractionType } from "./InteractionType";

export class UserDecision{
  type = InteractionType.USER_DECISION;
  options: string[];
  tags = []
  
  constructor(options: string[]) {
    this.options = options;
  }
  addTags(tags) {
    this.tags = this.tags.concat(tags);
  }
}
