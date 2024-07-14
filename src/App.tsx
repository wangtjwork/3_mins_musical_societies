import { useRef, useState } from 'react'
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import './App.css'
import { generateSingleNoteXml, singleNoteXmlDoc } from './utils/musicXMLUtils';
import { TREBLE_CLEF_NOTES_SCIENTIFIC } from './utils/musicNotesConfig';
import SingleNoteSheet from './components/SingleNoteSheet';

function App() {
  const [note, setNote] = useState<string>('');
  const [xmlDoc, setXmlDoc] = useState<XMLDocument | null>(null);

  const onStartClick = () => {
    const randomNote = TREBLE_CLEF_NOTES_SCIENTIFIC[Math.floor(Math.random() * TREBLE_CLEF_NOTES_SCIENTIFIC.length)];
    const randomNoteXmlDoc = generateSingleNoteXml(singleNoteXmlDoc, randomNote[0], randomNote[1]);
    setNote(randomNote);
    setXmlDoc(randomNoteXmlDoc);
  }

  return (
    <>
      <h1>五线谱读音名练习</h1>
      <button onClick={onStartClick}>开始</button>
      {xmlDoc != null ? <SingleNoteSheet xmlDoc={xmlDoc} /> : null}
      <div>答案：{note}</div>
    </>
  )
}

export default App
