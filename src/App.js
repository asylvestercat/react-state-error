import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';

function App() {
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
                    "text": "Mouseketeers"
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

  const [ceContent, setCeContent] = useState([]);
  const ceElement = useRef(null);

  function clickFinishButton() {
    setCeContent(arrayOfHTMLContents)
  }

  // useEffect(() => {
  //   setCeContent(arrayOfHTMLContents)
  // }, []);

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
