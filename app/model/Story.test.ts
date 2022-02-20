import { Branch } from "./Branch";
import { Option } from "./Option";
import { End } from "./End";
import { Expression, ExpressionType } from "./Expression";
import { Jump } from "./Jump";
import { NodeType } from "./NodeType";
import { Paragraph } from "./Paragraph";
import { Section } from "./Section";
import { Story } from "./Story";
import { SubSection } from "./SubSection";
import { TextContent } from "./TextContent";
import { Input } from "./Input";

describe('Story is able to be', () => {
  test('serialized to JSON', () => {
    let story = new Story();
    expect(JSON.parse(story.serialize())).toStrictEqual({
      id: "0",
      className: NodeType.STORY,
      sections: []
    });
  });
  test('serialized and deserialized from and to JSON', () => {
    let story = new Story();
    let section = new Section("1", "section1", "filePath1", 0);
    let subSection = new SubSection("2", "subsection1", "filePath1", 1);
    subSection.addContent(new Jump("3", "section2", "filePath1", 2))
    section.addSubSection(subSection);
    story.addSection(section);

    let section2 = new Section("4", "section2", "filePath2", 10);
    let subSection2 = new SubSection("5", "", "filePath1", 10);
    let paragraph = new Paragraph("6", "filePath1", 11);
    paragraph.addContent([new TextContent("7", "Hello World!", "filePath1", 12)])
    paragraph.addContent([new Expression("first_name", ExpressionType.VARIABLE)])
    subSection2.addContent(paragraph)
    let branch = new Branch("8", "filePath1", 13)
    let tc1 = new TextContent("13", "Option Text", "filePath1", 12);
    let expr1 = new Expression("first_name", ExpressionType.VARIABLE)
    let tc2 = new TextContent("13", "Response Text", "filePath1", 12);
    branch.addOption(new Option("8", [tc1, expr1], [tc2], null, null, "filePath1", 13))
    subSection2.addContent(branch)
    let input = new Input("14",{'a': 5, 'b': 6}, "filePath1", 13)
    subSection2.addContent(input)
    subSection2.addContent(new End("8", "filePath1", 13))
    section2.addSubSection(subSection2);
    story.addSection(section2);

    let storyJson = {
      id: "0",
      className: NodeType.STORY,
      sections: [
        {
          id: "1",
          className: NodeType.SECTION,
          name: "section1",
          line: 0,
          filePath: "filePath1",
          tags: [],
          subSections: [
            {
              id: "2",
              className: NodeType.SUBSECTION,
              name: "subsection1",
              line: 1,
              filePath: "filePath1",
              tags: [],
              content: [
                {
                  id: "3",
                  className: NodeType.JUMP,
                  name: "section2",
                  line: 2,
                  filePath: "filePath1",
                  tags: [],
                },
              ]
            },
          ]
        },
        {
          id: "4",
          className: NodeType.SECTION,
          name: "section2",
          line: 10,
          filePath: "filePath2",
          tags: [],
          subSections: [
            {
              id: "5",
              className: NodeType.SUBSECTION,
              name: "",
              line: 10,
              filePath: "filePath1",
              tags: [],
              content: [
                {
                  id: "6",
                  className: NodeType.PARAGRAPH,
                  line: 11,
                  filePath: "filePath1",
                  tags: [],
                  content: [
                    {
                      id: "7",
                      className: NodeType.TEXT_CONTENT,
                      line: 12,
                      filePath: "filePath1",
                      tags: [],
                      text: "Hello World!"
                    },
                    {
                      id: "unknown",
                      className: NodeType.EXPRESSION,
                      line: -1,
                      filePath: "unknown",
                      tags: [],
                      text: "first_name",
                      type: "VARIABLE",
                      children: []
                    },
                  ]
                },
                {
                  id: "8",
                  className: NodeType.BRANCH,
                  line: 13,
                  filePath: "filePath1",
                  tags: [],
                  options: [
                    {
                      id: "8",
                      className: NodeType.OPTION,
                      line: 13,
                      filePath: "filePath1",
                      tags: [],
                      condition: null,
                      textOption: [
                        {
                          id: "13",
                          className: NodeType.TEXT_CONTENT,
                          line: 12,
                          filePath: "filePath1",
                          tags: [],
                          text: "Option Text"
                        },
                        {
                          id: "unknown",
                          className: NodeType.EXPRESSION,
                          line: -1,
                          filePath: "unknown",
                          tags: [],
                          text: "first_name",
                          type: "VARIABLE",
                          children: []
                        },
                      ],
                      textResponse: [
                        {
                          id: "13",
                          className: NodeType.TEXT_CONTENT,
                          line: 12,
                          filePath: "filePath1",
                          tags: [],
                          text: "Response Text"
                        },
                      ],
                      jump: null
                    },

                  ]
                },
                {
                  id: "14",
                  className: NodeType.INPUT,
                  line: 13,
                  filePath: "filePath1",
                  tags: [],
                  json: {'a': 5,'b': 6}
                },
                {
                  id: "8",
                  className: NodeType.END,
                  line: 13,
                  filePath: "filePath1",
                  tags: [],
                },
              ]
            },
          ]
        },
      ]
    };
    expect(JSON.parse(story.serialize())).toStrictEqual(JSON.parse(JSON.stringify(storyJson)));
    expect(Story.deserialize(storyJson)).toStrictEqual(story);
  });
  test('loaded from JSON', () => {
    let story = new Story();
    let json = {
      id: "0",
      className: NodeType.STORY,
      sections: []
    };
    expect(Story.deserialize(json)).toStrictEqual(story);
  });
  test('loaded from JSON', () => {
    let json = {
      id: "0",
      className: "IncorrectClassName",
      sections: []
    };
    expect(() => {Story.deserialize(json)}).toThrowError("Incorrect JSON format!");
  });
});
