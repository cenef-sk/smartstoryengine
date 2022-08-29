// export class InteractionHistory {
//   storyId: string;
//   storyVersion: string;
//   interactionHistory: Interaction[] = [];
//   finished = false;
//   interactionUpdate(stateId: string, input: any) {
//     this.interactionHistory = this.interactionHistory.concat(new Interaction(stateId, input))
//   }
// }
export class Interaction {
  dateTime: Date;
  input: any;
  stateId: string;
  constructor(stateId: string, input: any = null, dateTime: Date = new Date()) {
    this.stateId = stateId;
    this.dateTime = dateTime;
    this.input = input;
  }

}
export class StoryWorld {
  state: any = {};
  interactionHistory: Interaction[] = [];
  finished = false;

  setVariable(name: string, value: any) {
    this.state[name] = value
    // check for variable change triggers
  }
  getVariable(name: string): any {
    return this.state[name]
  }
  interactionUpdate(stateId: string, input: any, dateTime?: Date) {
    this.interactionHistory = this.interactionHistory.concat((dateTime)?new Interaction(stateId, input, dateTime):new Interaction(stateId, input))
  }
  currentInteractionStateId(){
    if (this.interactionHistory.length) {
      return this.interactionHistory[this.interactionHistory.length - 1].stateId;
    } else {
      return null;
    }
  }
}
