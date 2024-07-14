const SINGLE_NOTE_PITCH_ID = "singleNotePitchID";
const SINGLE_NOTE_OCTAVE_ID = "singleNoteOctaveID";

const xmlString = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE score-partwise PUBLIC
    "-//Recordare//DTD MusicXML 4.0 Partwise//EN"
    "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
  <work>
    <work-title>考试中</work-title>
  </work>
  <part-list>
    <score-part id="P1">
      <part-name>Music</part-name>
    </score-part>
  </part-list>
  <part id="P1">
    <measure number="1">
      <attributes>
        <divisions>1</divisions>
        <key>
          <fifths>0</fifths>
        </key>
        <time>
          <beats>4</beats>
          <beat-type>4</beat-type>
        </time>
        <clef>
          <sign>G</sign>
          <line>2</line>
        </clef>
      </attributes>
      <note>
        <pitch>
          <step id="${SINGLE_NOTE_PITCH_ID}">C</step>
          <octave id="${SINGLE_NOTE_OCTAVE_ID}">4</octave>
        </pitch>
        <duration>4</duration>
        <type>whole</type>
      </note>
    </measure>
  </part>
</score-partwise>`

const parser = new DOMParser();
export const singleNoteXmlDoc = parser.parseFromString(xmlString, "text/xml");

function deepCopyXmlDocument(xmlDoc: XMLDocument): XMLDocument {
  const serializedXml = (new XMLSerializer()).serializeToString(xmlDoc.getRootNode())
  return new DOMParser().parseFromString(serializedXml, "text/xml")
}

export function generateSingleNoteXml(xmlDoc: XMLDocument, pitch: string, octave: string) {
  const pitchNode = xmlDoc.getElementById(SINGLE_NOTE_PITCH_ID);
  const octaveNode = xmlDoc.getElementById(SINGLE_NOTE_OCTAVE_ID);
  if (pitchNode == null || octaveNode == null) {
    console.warn('pitch or octave does not exist for this specific XML config, pitch: ', pitchNode, 'octave: ', octaveNode);
    return xmlDoc;
  }

  pitchNode.innerHTML = pitch;
  octaveNode.innerHTML = octave;

  // need to shallow copy to confirm the node changed for react
  return deepCopyXmlDocument(xmlDoc);
}
