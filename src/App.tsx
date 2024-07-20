import { useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { generateSingleNoteXml, singleNoteXmlDoc } from './utils/musicXMLUtils';
import { TREBLE_CLEF_NOTES_SCIENTIFIC } from './constants/musicNotesConfig';
import SingleNoteSheet from './components/SingleNoteSheet';
import { AppBar, Box, Button, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import SingleNotePickerForm from './components/SingleNotePickerForm';
import { ArrowBack, PlayArrow, Refresh } from '@mui/icons-material';
import { playNote } from './utils/playSoundUtils';
import { AppMode } from './constants/AppMode';

function App() {
  const [appMode, setAppMode] = useState<AppMode>(AppMode.INITIAL);

  const [note, setNote] = useState<string>('');
  const [xmlDoc, setXmlDoc] = useState<XMLDocument | null>(null);

  const onStartClick = () => {
    setAppMode(AppMode.TEST_NOTE_TO_PITCH);
    const randomNote = TREBLE_CLEF_NOTES_SCIENTIFIC[Math.floor(Math.random() * TREBLE_CLEF_NOTES_SCIENTIFIC.length)];
    const randomNoteXmlDoc = generateSingleNoteXml(singleNoteXmlDoc, randomNote[0], randomNote[1]);
    setNote(randomNote);
    setXmlDoc(randomNoteXmlDoc);
  }

  const onPlayClick = (note: string) => {
    playNote(note, '1')
  }

  return (
    <>
      <CssBaseline />
      <Box flexDirection={'column'} alignItems={'stretch'} textAlign={'center'} marginLeft={5} marginRight={5}>
        <AppBar position='static'>
          <Toolbar>
            {
              appMode != AppMode.INITIAL
                ? (<IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <ArrowBack onClick={() => setAppMode(AppMode.INITIAL)} />
                </IconButton>)
                : null
            }
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              五线谱读音名练习
            </Typography>
            <Button color='error' onClick={() => location.reload()}><Refresh /></Button>
          </Toolbar>
        </AppBar>
        <Stack flexGrow={1} alignItems={'center'} marginTop={5}>
          {note == '' ? <Button sx={{ width: 'fit-content' }} variant='contained' onClick={onStartClick}>开始</Button> : null}
          {xmlDoc != null ? <SingleNoteSheet xmlDoc={xmlDoc} /> : null}
          {note != '' ? <SingleNotePickerForm correctNote={note} onNext={onStartClick} /> : null}
          {note != '' ? <Button color='success' onClick={() => onPlayClick(note)}><PlayArrow /> </Button> : null}
        </Stack>
      </Box>
    </>
  )
}

export default App
