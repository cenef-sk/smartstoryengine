import { InteractionType } from "./InteractionType";

export class Message{
  message: string;
  type = InteractionType.MESSAGE;
  tags = []

  constructor(message: string) {
    this.message = message;
  }
  addTags(tags) {
    this.tags = this.tags.concat(tags);
  }
}
