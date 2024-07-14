import { useRef, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { generateSingleNoteXml, singleNoteXmlDoc } from './utils/musicXMLUtils';
import { TREBLE_CLEF_NOTES_SCIENTIFIC } from './utils/musicNotesConfig';
import SingleNoteSheet from './components/SingleNoteSheet';
import { AppBar, Box, Button, CssBaseline, Stack, Toolbar, Typography } from '@mui/material';
import SingleNotePickerForm from './components/SingleNotePickerForm';

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
      <CssBaseline />
      <Box flexDirection={'column'} alignItems={'stretch'} textAlign={'center'} marginLeft={5} marginRight={5}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              五线谱读音名练习
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack flexGrow={1} alignItems={'center'} marginTop={5}>
          {note == '' ? <Button sx={{ width: 'fit-content' }} variant='contained' onClick={onStartClick}>开始</Button> : null}
          {xmlDoc != null ? <SingleNoteSheet xmlDoc={xmlDoc} /> : null}
          {note != '' ? <SingleNotePickerForm correctNote={note} onNext={onStartClick} /> : null}
        </Stack>
      </Box>
    </>
  )
}

export default App
