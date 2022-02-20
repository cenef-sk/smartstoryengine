import { Line } from "./Line";
import { NodeType } from "./NodeType";
import { SubSection } from "./SubSection";

export class Section extends Line {
  name: string = "";
  subSections: SubSection[] = []; // ordered list subSections


  constructor(id: string, name: string, filePath: string, line: number) {
    super(id, NodeType.SECTION, filePath, line);
    this.name = name;
  }
  addSubSection(subSection: SubSection) {
    this.subSections = this.subSections.concat(subSection);
  }
  static deserialize(json: any): Section {
    let section = new Section(json.id, json.name, json.filePath, json.line);
    section.subSections = json.subSections.map((subSection: any) => SubSection.deserialize(subSection))
    section.deserialize(json);
    return section;
  }
}
