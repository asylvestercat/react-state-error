import {useEffect, useRef, useState} from 'react';
import './App.css';
import _map from 'lodash/map';
import _compact from 'lodash/compact';
import jsonFileData from './json.json';
import InlineHtml from "./InlineHTML";

function App() {

  const [ceContent, setCeContent] = useState([]);
  const ceElement = useRef(null);
  const jsonBodyTextArr = useRef(jsonFileData.wysiwygFileData.content.bodyText ? jsonFileData.wysiwygFileData.content.bodyText : []);
  const arrayOfHTMLContents = [
    {
      "type": "p",
      "key": "textblock-body-p-0",
      "ref": null,
      "props": {
        "children": {
          "key": null,
          "ref": null,
          "props": {
            "textData": [
              "Cats ",
              "rule! ",
              {
                "type": "bold",
                "text": [
                  "Howdy ",
                  {
                    "type": "italics",
                    "text": "Mouseketeeeeeeeeers"
                  },
                  "!"
                ]
              }
            ]
          },
          "_owner": null,
          "_store": {}
        }
      },
      "_owner": null,
      "_store": {}
    }
  ]

  console.log("ceContent", ceContent)


  const readJsonArr = (jsonBodyText) => {
    let bodyContent;
    if (jsonBodyText && Array.isArray(jsonBodyText) && jsonBodyText.length > 0) {
      bodyContent = _compact(_map(jsonBodyText, (bodyText, i) => {
        if (bodyText.type && typeof bodyText.type === 'string' && bodyText.content) {
          let bodyElement = '';
          switch (bodyText.type) {
            case "p":
              bodyElement =
                <p key={`textblock-body-${bodyText.type}-${i}`}><InlineHtml textData={bodyText.content}/></p>;
              break;
            default:
              bodyElement = '';
          }
          return bodyElement;
        } else {
          console.error("Error with bodyText")
        }
      }));
    } else {
      console.error("Error with what is being sent to readJsonArr")
    }
    return bodyContent
  }

  useEffect(() => {
    // 1. sets inital state from json here and successfully displays in the text-input div
    setCeContent(readJsonArr(jsonBodyTextArr.current));
  }, []);


  const clickFinishButton = () => {
    // 2. Errors out when try to set it to hardcoded array of object
    setCeContent(arrayOfHTMLContents);
  }

  return (
    <>
      <div className="App">
        <div id="text-input" contentEditable="true" suppressContentEditableWarning={true}
             ref={ceElement}>{ceContent}</div>
        <button onClick={() => clickFinishButton()}>Rewrite state</button>
      </div>
    </>
  );
}

export default App;
