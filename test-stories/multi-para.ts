export const story = {
  "className": "STORY",
  "id": "0",
  "sections": [
    {
      "className": "SECTION",
      "id": "1",
      "tags": [],
      "filePath": "./test-stories/simple/multiPara.sslng",
      "line": 0,
      "name": "",
      "subSections": [
        {
          "className": "SUBSECTION",
          "id": "2",
          "tags": [],
          "filePath": "./test-stories/simple/multiPara.sslng",
          "line": 0,
          "name": "",
          "content": [
            {
              "className": "PARAGRAPH",
              "id": "3",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 3,
              "content": [
                {
                  "className": "TEXT_CONTENT",
                  "id": "4",
                  "tags": [],
                  "filePath": "./test-stories/simple/multiPara.sslng",
                  "line": 3,
                  "text": "Something at the start<>"
                }
              ]
            },
            {
              "className": "PARAGRAPH",
              "id": "5",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 4,
              "content": [
                {
                  "className": "TEXT_CONTENT",
                  "id": "6",
                  "tags": [],
                  "filePath": "./test-stories/simple/multiPara.sslng",
                  "line": 4,
                  "text": "This is OK"
                }
              ]
            },
            {
              "className": "PARAGRAPH",
              "id": "7",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 6,
              "content": [
                {
                  "className": "TEXT_CONTENT",
                  "id": "8",
                  "tags": [],
                  "filePath": "./test-stories/simple/multiPara.sslng",
                  "line": 6,
                  "text": "Something not yet finished"
                }
              ]
            },
            {
              "className": "JUMP",
              "id": "9",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 7,
              "name": "Label1"
            }
          ]
        }
      ]
    },
    {
      "className": "SECTION",
      "id": "10",
      "tags": [],
      "filePath": "./test-stories/simple/multiPara.sslng",
      "line": 8,
      "name": "Label1",
      "subSections": [
        {
          "className": "SUBSECTION",
          "id": "11",
          "tags": [],
          "filePath": "./test-stories/simple/multiPara.sslng",
          "line": 8,
          "name": "",
          "content": [
            {
              "className": "PARAGRAPH",
              "id": "12",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 9,
              "content": [
                {
                  "className": "TEXT_CONTENT",
                  "id": "13",
                  "tags": [],
                  "filePath": "./test-stories/simple/multiPara.sslng",
                  "line": 9,
                  "text": "Something Interesting<>"
                }
              ]
            },
            {
              "className": "PARAGRAPH",
              "id": "14",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 10,
              "content": [
                {
                  "className": "TEXT_CONTENT",
                  "id": "15",
                  "tags": [],
                  "filePath": "./test-stories/simple/multiPara.sslng",
                  "line": 10,
                  "text": "My name is "
                },
                {
                  "className": "EXPRESSION",
                  "id": "unknown",
                  "tags": [],
                  "filePath": "unknown",
                  "line": -1,
                  "children": [
                    {
                      "className": "EXPRESSION",
                      "id": "unknown",
                      "tags": [],
                      "filePath": "unknown",
                      "line": -1,
                      "children": [],
                      "text": "first_name",
                      "type": "VARIABLE"
                    }
                  ],
                  "text": "My name is {first_name}{last_name} age {age + 1}",
                  "type": "NESTED_EXPRESSION"
                },
                {
                  "className": "EXPRESSION",
                  "id": "unknown",
                  "tags": [],
                  "filePath": "unknown",
                  "line": -1,
                  "children": [
                    {
                      "className": "EXPRESSION",
                      "id": "unknown",
                      "tags": [],
                      "filePath": "unknown",
                      "line": -1,
                      "children": [],
                      "text": "last_name",
                      "type": "VARIABLE"
                    }
                  ],
                  "text": "My name is {first_name}{last_name} age {age + 1}",
                  "type": "NESTED_EXPRESSION"
                },
                {
                  "className": "TEXT_CONTENT",
                  "id": "16",
                  "tags": [],
                  "filePath": "./test-stories/simple/multiPara.sslng",
                  "line": 10,
                  "text": " age "
                },
                {
                  "className": "EXPRESSION",
                  "id": "unknown",
                  "tags": [],
                  "filePath": "unknown",
                  "line": -1,
                  "children": [
                    {
                      "className": "EXPRESSION",
                      "id": "unknown",
                      "tags": [],
                      "filePath": "unknown",
                      "line": -1,
                      "children": [],
                      "text": "age",
                      "type": "VARIABLE"
                    },
                    {
                      "className": "EXPRESSION",
                      "id": "unknown",
                      "tags": [],
                      "filePath": "unknown",
                      "line": -1,
                      "children": [],
                      "text": "+",
                      "type": "OPERATOR"
                    },
                    {
                      "className": "EXPRESSION",
                      "id": "unknown",
                      "tags": [],
                      "filePath": "unknown",
                      "line": -1,
                      "children": [],
                      "text": "1",
                      "type": "NUMBER"
                    }
                  ],
                  "text": "My name is {first_name}{last_name} age {age + 1}",
                  "type": "NESTED_EXPRESSION"
                }
              ]
            },
            {
              "className": "PARAGRAPH",
              "id": "17",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 11,
              "content": [
                {
                  "className": "TEXT_CONTENT",
                  "id": "18",
                  "tags": [],
                  "filePath": "./test-stories/simple/multiPara.sslng",
                  "line": 11,
                  "text": "Just Another with new \\nLine"
                }
              ]
            },
            {
              "className": "END",
              "id": "19",
              "tags": [],
              "filePath": "./test-stories/simple/multiPara.sslng",
              "line": 12
            }
          ]
        }
      ]
    }
  ]
}
