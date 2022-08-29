import { EndOfStory } from "./interaction-model/EndOfStory";
import { Message } from "./interaction-model/Message";
import { UserDecision } from "./interaction-model/UserDecision";
import { UserInteraction } from "./interaction-model/UserInteraction";
import { Branch } from "./model/Branch";
import { End } from "./model/End";
import { Expression } from "./model/Expression";
import { ExpressionEvaluator } from "./model/ExpressionEvaluator";
import { Input } from "./model/Input";
import { Jump } from "./model/Jump";
import { Paragraph } from "./model/Paragraph";
import { Story } from "./model/Story";
import { TextContent } from "./model/TextContent";
import { Interaction, StoryWorld } from "./StoryWorld";

export class SmartStoryEngine {
  story: any;  // whole interactive story
  world = new StoryWorld();
  decisionNeeded = false;
  inputNeeded = false;
  current: Jump|End|Paragraph|Branch|Input|null = null;
  storyIterator;

  private constructor(jsonStory: any) {
    this.story = jsonStory;
    this.storyIterator = this.storyBrowser();
  }

  reset() {
    this.storyIterator = this.storyBrowser();
    this.world = new StoryWorld();
    this.current = null;
    this.inputNeeded = false;
    this.decisionNeeded = false;
  }

  *storyBrowser() { // we can define init state here, or interaction history
    let res = ""; // it will be any or specific object, INPUT, BRANCH, TEXT
    // let curr = this.story.sections[0].subsections[0];

    let dateTime = yield;
    this.current =  this.story.first(this.world);
    while (!(this.current instanceof End)) {
      if (this.current instanceof Paragraph) {
        let res = new Message(this.current.eval(this.world));
        res.addTags(this.current.tags);
        if (dateTime) {
          this.world.interactionUpdate(this.current.id, null, dateTime);
        } else {
          this.world.interactionUpdate(this.current.id, null);
        }
        dateTime = yield res;
        this.current = this.story.next(this.current.id, this.world);
      } else if (this.current instanceof Branch) {
        let res = new UserDecision(this.current.options.map(option => option.option(this.world)));
        // todo tags
        dateTime = yield res;
        this.current = this.story.next(this.current.id, this.world);
        //TODO check if input is provided
      } else if (this.current instanceof Input) {
        let res = new UserInteraction(this.current.json);
        //todo tags
        dateTime = yield res;
        this.current = this.story.next(this.current.id, this.world);
        //TODO check if input is provded
      } else {
        console.log(this.current)
        throw new Error("Unexpected type of node!");
      }
    }
    if (dateTime) {
      this.world.interactionUpdate(this.current.id, null, dateTime);
    } else {
      this.world.interactionUpdate(this.current.id, null);
    }
    this.world.finished = true;
    return new EndOfStory();
  }

  hasNext(): boolean {
      if (this.world.finished) {
        return false;
      } else {
        return true;
      }
  }

  next(dateTime?: Date): Message | UserDecision | UserInteraction | EndOfStory {
    // waiting for Input
    // no input provided
    let nextNode = (dateTime)?this.storyIterator.next(dateTime):this.storyIterator.next();
    if (nextNode instanceof UserDecision) {
      this.decisionNeeded = true;
    }
    if (nextNode instanceof UserInteraction) {
      this.inputNeeded = true;
    }
    return nextNode.value;
    // if (nextNode.done) {
    // } else {
    // }
  }

  makeAChoice(choice: number, dateTime?: Date): string {
    this.decisionNeeded = false;
    //set history
    // update world
    let res = "";
    if (this.current instanceof Branch) {
      let branch = this.current;
      if(dateTime) {
        this.world.interactionUpdate(this.current.id, choice, dateTime);
      } else {
        this.world.interactionUpdate(this.current.id, choice);
      }
      branch.makeAChoice(choice);
      let option = branch.options[choice]
      res = option.response(this.world)
      // I should set something ???
    }
    return res;
  }

  provideAnInput(inputObj: any, dateTime?: Date): string{
    this.inputNeeded = false;
    // I should set something variable from object with object ...
    if (this.current instanceof Input) {
      let json = this.current.json
      if(dateTime) {
        this.world.interactionUpdate(this.current.id, inputObj, dateTime);
      } else {
        this.world.interactionUpdate(this.current.id, inputObj);
      }
      if (json.variable) {
        this.world.setVariable(json.variable, inputObj)
      }
    }
    // set history
    // TODO some response
    return "";
  }

  static tellTheStory(jsonStory: any) {
    let story = new SmartStoryEngine(Story.deserialize(jsonStory));
    story.next();
    return story;
  }

  save() {
    return this.world.interactionHistory;
  }

  load (interactionHistory: Interaction[]) {
    // this.reset(); // do not reset - variables will be reset
    interactionHistory.forEach(interaction => {
        let curr = this.next(interaction.dateTime);
        if (curr instanceof UserDecision) {
          this.makeAChoice(interaction.input, interaction.dateTime);
        } else if (curr instanceof UserInteraction) {
          this.provideAnInput(interaction.input, interaction.dateTime);
        }
    });
  }
}
