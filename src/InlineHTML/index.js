import {Link} from "react-router-dom";

import _map from 'lodash/map';
import _compact from 'lodash/compact';

function InlineHtml(props) {

  const {textData} = props;

  let isArrData = textData && Array.isArray(textData) && textData.length > 0;
  let isStringData = textData && typeof textData === 'string';
  let textOutput = '';
  if (isArrData || isStringData) {
    if (isArrData) {
      textOutput = _compact(_map(textData, function(textSection, i) {
        if (typeof textSection === 'string') {
          return textSection;
        }
        if (textSection.type && textSection.text) {
          let textElement = '';
          switch (textSection.type) {
            case "anchor":
              if (textSection.destination && typeof textSection.destination === 'string') {
                textElement = textSection.isExternal ?
                  <a key={'inlinehtmltext-' + textSection.type + '-' + i} href={textSection.destination} target="_blank" rel="noopener noreferrer">{<InlineHtml textData={textSection.text} />}</a>
                  :
                  <Link key={'inlinehtmltext-' + textSection.type + '-' + i} to={textSection.destination}>{<InlineHtml textData={textSection.text} />}</Link>;
              }
              break;
            case "bold":
              textElement = <strong key={'inlinehtmltext-' + textSection.type + '-' + i}>{<InlineHtml textData={textSection.text} />}</strong>
              break;
            case "italics":
              textElement = <em key={'inlinehtmltext-' + textSection.type + '-' + i}>{<InlineHtml textData={textSection.text} />}</em>
              break;
            default:
              textElement = '';
          }
          return textElement;
        }
      }));
    }
    if (isStringData) {
      textOutput = textData;
    }
  }

  return <>{textOutput}</>;
}

export default InlineHtml;
