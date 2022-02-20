import { InteractionType } from "./InteractionType";

export class UserInteraction{
  type = InteractionType.USER_INTERACTION;
  json: any;
  tags = []
  
  constructor(json: any) {
    this.json = json;
  }
  addTags(tags) {
    this.tags = this.tags.concat(tags);
  }
}
