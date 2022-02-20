import { EndOfStory } from "./app/interaction-model/EndOfStory";
import { InteractionType } from "./app/interaction-model/InteractionType";
import { Message } from "./app/interaction-model/Message";
import { UserDecision } from "./app/interaction-model/UserDecision";
import { UserInteraction } from "./app/interaction-model/UserInteraction";
import { SmartStoryEngine } from "./app/SmartStoryEngine";
import story from "./test-stories/simple-complex.json"
import input from "readline-sync";


let engine = SmartStoryEngine.tellTheStory(story);
while (engine.hasNext()){
  // engine.world.setVariable("first_name", "Peter ");
  // engine.world.setVariable("last_name", "Smith");
  // engine.world.setVariable("age", 5);
  let next = engine.next();
  if(next instanceof Message) {
    console.log(next.message)
  } else
  if(next instanceof UserDecision) {
    next.options.forEach((option, index) => {
      console.log(" " + index + ". " + option)
    })
    let sChoice = input.question("Your choice: ");
    let choice = +sChoice;
    console.log(engine.makeAChoice(choice));
  } else
  if(next instanceof UserInteraction) {
    let prompt = ": ";
    if (next.json.prompt) {
      prompt = next.json.prompt + " "
    }
    let res = input.question(prompt);
    console.log(engine.provideAnInput(res))
  } else
  if(next instanceof EndOfStory) {
    console.log("THE END.")
  } else {
    throw new Error("Something went frong. No more content.");
  }
}
console.log(engine.world.interactionHistory);
console.log("END.")
// load(json)
// next
// bind
// trigger
// set value
//
