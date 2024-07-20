import { useState } from "react";
import SingleNoteSheet from "./SingleNoteSheet";
import SingleNotePickerForm from "./SingleNotePickerForm";
import { Button } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { playNote } from "../utils/playSoundUtils";
import { TREBLE_CLEF_NOTES_SCIENTIFIC } from "../constants/musicNotesConfig";
import { generateSingleNoteXml, singleNoteXmlDoc } from "../utils/musicXMLUtils";

function getRandomElement<T>(array: Array<T>): T {
  return array[Math.floor(Math.random() * array.length)];
}

function NoteToPitchTestSection() {
  const [note, setNote] = useState<string>(getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC));
  const [xmlDoc, setXmlDoc] = useState<XMLDocument>(generateSingleNoteXml(singleNoteXmlDoc, note[0], note[1]));

  const onNextClick = () => {
    const randomNote = getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC);
    const randomNoteXmlDoc = generateSingleNoteXml(singleNoteXmlDoc, randomNote[0], randomNote[1]);
    setNote(randomNote);
    setXmlDoc(randomNoteXmlDoc);
  }

  const onPlayClick = (note: string) => {
    playNote(note, '1')
  }

  return <>
    <SingleNoteSheet xmlDoc={xmlDoc} />
    <SingleNotePickerForm correctNote={note} onNext={onNextClick} />
    <Button color='success' onClick={() => onPlayClick(note)}><PlayArrow /> </Button>
  </>
}

export default NoteToPitchTestSection;