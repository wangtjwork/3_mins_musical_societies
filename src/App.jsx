import { useCallback, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import './App.css'

function App() {

  const musicSheetRef = useRef(null);

  const onStartClick = () => {
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
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const osmd = new OpenSheetMusicDisplay(musicSheetRef.current);
    osmd.setOptions({
      backend: "svg",
      drawTitle: false,
      drawingParameters: "compacttight" // don't display title, composer etc., smaller margins
    });

    osmd.load(xmlDoc).then(() => osmd.render());

  }

  return (
    <>
      <div>Hello World</div>
      <button onClick={onStartClick}>开始</button>
      <div class={"sheet"} ref={musicSheetRef} />
    </>
  )
}

export default App
