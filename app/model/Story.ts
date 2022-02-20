import { StoryWorld } from "../StoryWorld";
import { Branch } from "./Branch";
import { End } from "./End";
import { ExpressionEvaluator } from "./ExpressionEvaluator";
import { Input } from "./Input";
import { Jump } from "./Jump";
import { NodeType } from "./NodeType";
import { Paragraph } from "./Paragraph";
import { Section } from "./Section";
import { Serializable } from "./Serializable";
import { SubSection } from "./SubSection";

export class Story extends Serializable{
  // version
  // author
  // complexity??
  // name

  sections: Section[] = []; // ordered list for Sections
  constructor(id: string = "0") {
    super(id, NodeType.STORY)
  }

  addSection(section: Section) {
    this.sections = this.sections.concat(section);
  }

  serialize(): string {
    return(JSON.stringify(this))
  }

  static deserialize(json: any) {
    let story = new Story(json.id);

    if (json.className == story.className) {
      story.sections = json.sections.map((section: any) => Section.deserialize(section))
    } else {
      throw new Error("Incorrect JSON format!");
    }
    return story;
    // Serializable.deserialize(json);
  }

  // story navigation functions
  first(world: StoryWorld): Paragraph|Branch|Input|End {
    if (this.sections.length && this.sections[0].subSections.length && this.sections[0].subSections[0].content.length) {
      let node = this.sections[0].subSections[0].content[0];
      if (node instanceof Jump) {
        return this.next(node.id, world)
      } else {
        return node;
      }
    } else {
      throw new Error("Story is not correctlly formatted!")
    }
  }

  named(name: string, currentSection: (string | null) = null): Paragraph|Branch|Input|Jump|End {
    let section = this.sections.find((section) => {
      return (section.name == name)
    })
    if (section) {
      if (section.subSections.length && section.subSections[0].content.length) {
        return section.subSections[0].content[0]
      } else {
        throw new Error("Story is not correctly formatted!")
      }
    } else {
      let section = this.sections.find((section) => {
        return (section.name == currentSection)
      })
      if (section){
        let subSection = section.subSections.find((subSection) => {
          return (subSection.name == name)
        })
        if (subSection) {
          if (subSection.content.length) {
            return subSection.content[0]
          } else {
            throw new Error("Story is not correctlly formatted!")
          }
        } else {
          throw new Error("SubSection '" + name +"' does not exists")
        }
      } else {
        throw new Error("Section '" + currentSection +"' does not exists")
      }
    }
  }

  find(stateId: string): any{
    let res = this.sections.map((section, i) => {
      let res = section.subSections.map((subSection, j) => {
        let res = subSection.content.map((content, k) => {
          return [i, j, k, content.id == stateId]
        })
        return res;
      })
      return res
    });
    let res2 = res.reduce((prev, curr) => {
      return prev.concat(curr)
    }, [])
    let res3 = res2.reduce((prev, curr) => {
      return prev.concat(curr)
    }, [])

    return res3.find(item => item[3])
  }
  next(stateId: string, world: StoryWorld) {
    let res = this.nextAll(stateId, world);
    // todo should be while
    while(res instanceof Jump || res instanceof Branch) {
      if (res instanceof Jump) {
        res = this.next(res.id, world)
      } else if (res instanceof Branch) {
        let choice: any = null
        res.options.forEach((option, index) => {
          if (!option.textOption.length && choice == null) {
            choice = -1;
          }
          if (option.condition) {
            let ee = new ExpressionEvaluator();
            let value = ee.eval(world, option.condition.children)[1]
            if (value === true) {
              choice = index;
            }
          }
        })
        if (choice != null) {
          res.choice = choice
        }
        if (res.choice != null) {
          res = this.nextAll(res.id, world)
        } else {
          break;
        }
      }
    }
    return res;
  }

  nextAll(stateId: string, world: StoryWorld) {
    let curr = this.find(stateId);
    if (curr) {
      let currContent = this.sections[curr[0]].subSections[curr[1]].content;
      let currNode = currContent[curr[2]]
      if(currNode instanceof Jump) {
        return this.named(currNode.name)
      } else if (currNode instanceof Paragraph) {
        if (currContent.length > curr[2] + 1) {
          return(currContent[curr[2] + 1])
        } else {
          throw new Error("No More Content!")
        }
      } else if (currNode instanceof Branch) {
        if (currNode.choice != null && currNode.choice != -1) {
          let option = currNode.options[currNode.choice];
          currNode.choice = null;
          if (option.jump) {
            //TODO if jump is END
            return this.named(option.jump.name)
          } else {
            if (currContent.length > curr[2] + 1) {
              return(currContent[curr[2] + 1])
            } else {
              throw new Error("No More Content!")
            }
          }
        } else {
          if (currContent.length > curr[2] + 1) {
            return(currContent[curr[2] + 1])
          } else {
            throw new Error("No More Content!")
          }
        }
      } else if (currNode instanceof Input) {
        if (currContent.length > curr[2] + 1) {
          return(currContent[curr[2] + 1])
        } else {
          throw new Error("No More Content!")
        }
        // test if Input provided? maybe not

      } else if (currNode instanceof End) {
        throw new Error("No more Content! Story Ended!")
      } else {
        throw new Error("Unknown type of node")
      }
    } else {
      throw new Error("StateId '" + stateId + "' was not found (just looking on the direct subSection level)")
    }
  }

}
