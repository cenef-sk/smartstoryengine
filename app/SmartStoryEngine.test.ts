import { SmartStoryEngine } from "./SmartStoryEngine";
import { story as oneLineStory} from "../test-stories/hello-world"
import simpleComplexStory from "../test-stories/simple-complex.json"

import { Message } from "./interaction-model/Message";
import { EndOfStory } from "./interaction-model/EndOfStory";
import { UserInteraction } from "./interaction-model/UserInteraction";
import { UserDecision } from "./interaction-model/UserDecision";

describe('SmartStoryEngine is able to', () => {
  // test('run JSON empty interactive story', () => {
  //   let story = {};
  //   let smartStory = SmartStoryEngine.tellTheStory(story);
  //   expect(smartStory.hasNext()).toBe(false);
  //   expect(smartStory.hasNext()).toBe(false);
  // });
  test('one line interactive story', () => {
      let smartStory = SmartStoryEngine.tellTheStory(oneLineStory);
      expect(smartStory.hasNext()).toBe(true);
      expect(smartStory.next()).toStrictEqual(new Message("Hello world!"));
      expect(smartStory.hasNext()).toBe(true);
      expect(smartStory.next()).toStrictEqual(new EndOfStory());
      expect(smartStory.hasNext()).toBe(false);
  });
  test('save and restore progressed story', () => {
      let smartStory = SmartStoryEngine.tellTheStory(simpleComplexStory);
      expect(smartStory.hasNext()).toBe(true);
      expect(smartStory.next()).toStrictEqual(new Message(""));
      expect(smartStory.next()).toStrictEqual(new Message("What is your name?"));
      expect(smartStory.next()).toStrictEqual(new UserInteraction({
         "prompt": "Your name:",
         "type": "text",
         "variable": "name",
       })
     );
     expect(smartStory.provideAnInput("Peter")).toBe("");
     let persistedState1 = smartStory.save();
     expect(smartStory.next()).toStrictEqual(new Message("Hello Peter!"));
     expect(smartStory.next()).toStrictEqual(new Message("Would you like something to drink?"));
     expect(smartStory.next()).toStrictEqual(new UserDecision(["Yes", "No"]));
     expect(smartStory.makeAChoice(1)).toBe("No, thank you. ");
     expect(smartStory.next()).toStrictEqual(new Message("Something to eat?"));
     let persistedState2 = smartStory.save();
     expect(smartStory.next()).toStrictEqual(new UserDecision(["Sandwich", "Apple", "No"]));

     let smartStory2 = SmartStoryEngine.tellTheStory(simpleComplexStory);
     smartStory2.load(persistedState1);
     expect(smartStory2.next()).toStrictEqual(new Message("Hello Peter!"));
     expect(smartStory2.next()).toStrictEqual(new Message("Would you like something to drink?"));
     expect(smartStory2.next()).toStrictEqual(new UserDecision(["Yes", "No"]));
     expect(smartStory2.makeAChoice(1)).toBe("No, thank you. ");
     expect(smartStory2.next()).toStrictEqual(new Message("Something to eat?"));

     let smartStory3 = SmartStoryEngine.tellTheStory(simpleComplexStory);
     smartStory3.load(persistedState2);
     expect(smartStory3.next()).toStrictEqual(new UserDecision(["Sandwich", "Apple", "No"]));
     expect(smartStory3.makeAChoice(1)).toBe("Apple, please. ");
     expect(smartStory3.next()).toStrictEqual(new Message(""));
     expect(smartStory3.next()).toStrictEqual(new Message("It would be 8."));
     expect(smartStory3.next()).toStrictEqual(new Message("Bye."));
     expect(smartStory3.hasNext()).toBe(true);
     expect(smartStory3.next()).toStrictEqual(new EndOfStory());
     let persistedState3 = smartStory3.save();
     expect(smartStory3.hasNext()).toBe(false);

     let smartStory4 = SmartStoryEngine.tellTheStory(simpleComplexStory);
     smartStory4.load(persistedState3);
     expect(smartStory4.hasNext()).toBe(false);
  });

  // test('one line story', () => {
  //   let parser = SimpleStoryParser.createParser();
  //   let story = "Hello World!";
  //   let engine = StoryEngine.createStoryFromString(parser, story);
  //
  //   expect(engine.hasNext()).toBe(true);
  //   expect(engine.hasNext()).toBe(true);
  //   expect(engine.next()[0].text).toBe(story); // TODO redefine output format
  //   expect(engine.hasNext()).toBe(false);
  //   expect(() => {engine.next()}).toThrowError("There is nothing more for you!"); //
  // });
  //
  // test('simple story', () => {
  //   let parser = SimpleStoryParser.createParser();
  //   let story = `
  //   Text Paragraph1
  //   Text Paragraph2
  //   `;
  //   let engine = StoryEngine.createStoryFromString(parser, story);
  //
  //   expect(engine.hasNext()).toBe(true);
  //   expect(engine.hasNext()).toBe(true);
  //   let res = engine.next();
  //   expect(res.length).toBe(2);
  //   expect(engine.hasNext()).toBe(false);
  // });
  // test('simple story with option', () => {
  //   let parser = SimpleStoryParser.createParser();
  //   let story = `
  //   May I bring you something to eat?
  //     *Yes, please
  //       ->section1
  //     *No, thanks
  //       ->section2
  //     *I have to go!
  //       ->END
  //   ==section1
  //     What would you like
  //     *Sandwich
  //     *Hamburger
  //     *Just apple
  //     -
  //     ->section2
  //   ==section2
  //     Something to Drink?
  //     *Coffee
  //     *Tee
  //     *Just water
  //     -Ok, will be right back.
  //     ->END
  //   `;
  //   let engine = StoryEngine.createStoryFromString(parser, story);
  //
  //   let par1 = engine.next(); //paragraph
  //   expect(par1.length).toBe(1);
  //   let options1 = engine.next(); //options
  //   expect(options1.length).toBe(3);
  //   engine.chooseChoiceIndex(0);
  //   let par2 = engine.next(); //paragraph
  //   expect(par2.length).toBe(2); // option + paragraph
  //   let options2 = engine.next(); //options
  //   expect(options2.length).toBe(3);
  //   engine.chooseChoiceIndex(2);
  //   let par3 = engine.next(); //paragraph
  //   expect(par3.length).toBe(3);
  //   let options3 = engine.next(); //options
  //   expect(options3.length).toBe(3);
  //   engine.chooseChoiceIndex(0);
  //   let par4 = engine.next(); //paragraph
  //   expect(par4.length).toBe(2);
  //   expect(engine.hasNext()).toBe(false);
  // });
  // test('simple story with option and input', () => {
  //   let parser = SimpleStoryParser.createParser();
  //   let story = `
  //   I would like to ask you.
  //   What are your favourite drinks?
  //   >type: possiblitiesWithAnswer
  //   >checkbox: Tea
  //   >answer: true, Yes, it is great
  //   >answer: false, Why you do not drink this?
  //   >checkbox: Vodka
  //   >answer: false reccomendation: Do not drink that much
  //   >other: other
  //   Thanks for the answers
  //   ->END
  //   `;
  //   let engine = StoryEngine.createStoryFromString(parser, story);
  //
  //   let par1 = engine.next(); //paragraph
  //   expect(par1.length).toBe(2);
  //   let input = engine.next(); //options
  //   expect(input.length).toBe(7);
  //   engine.provideInput({complexInput: "here"});
  //   let par2 = engine.next(); //paragraph
  //   expect(par2.length).toBe(1); // option + paragraph
  //   expect(engine.hasNext()).toBe(false);
  // });
});
