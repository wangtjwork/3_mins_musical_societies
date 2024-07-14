import { useRef, useState } from 'react'
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import './App.css'
import { generateSingleNoteXml, singleNoteXmlDoc } from './utils/musicXMLUtils';
import { TREBLE_CLEF_NOTES_SCIENTIFIC } from './utils/musicNotesConfig';

function App() {
  const [note, setNote] = useState('');

  const musicSheetRef = useRef(null);

  const onStartClick = () => {
    const randomNote = TREBLE_CLEF_NOTES_SCIENTIFIC[Math.floor(Math.random()*TREBLE_CLEF_NOTES_SCIENTIFIC.length)];
    const xmlDoc = generateSingleNoteXml(singleNoteXmlDoc, randomNote[0], randomNote[1]);
    setNote(randomNote);

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
      <h1>五线谱读音名练习</h1>
      <button onClick={onStartClick}>开始</button>
      <div class={"sheet"} ref={musicSheetRef} />
      <div>答案：{note}</div>
    </>
  )
}

export default App
