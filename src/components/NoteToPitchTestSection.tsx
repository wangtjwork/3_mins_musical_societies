import { useContext, useMemo, useState } from "react";
import SingleNoteSheet from "./SingleNoteSheet";
import SingleNotePickerForm from "./SingleNotePickerForm";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { NavigateNext, PlayArrow } from "@mui/icons-material";
import { playNote } from "../utils/playSoundUtils";
import { generateSingleNoteXml, SheetNoteDefinition, singleNoteXmlDoc } from "../utils/musicXMLUtils";
import useQuestionSeries from "../hooks/useQuestionSeries";
import { generateRandomSingleNote } from "../utils/noteGenerationUtils";
import { UserPreferencesContext } from "./UserPreferencesContextProvider";
import { Clef, NoteDefinition } from "../types/NoteType";
import { getNotePreference } from "../utils/UserPreferencesToNotePreferenceUtils";

const SERIES_LENGTH = 20;

type Props = {
  goToMainPage: () => void
}

function NoteToPitchTestSection({ goToMainPage }: Props) {
  const [note, setNote] = useState<SheetNoteDefinition>(generateRandomSingleNote({ clefs: ['treble'], includeExtendedRange: false }));
  const xmlDoc = useMemo(() => {
    return generateSingleNoteXml(singleNoteXmlDoc, note);
  }, [note]);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctNotesCount, setCorrectNotesCount] = useState(0);
  const { index, hasNext, goToNext, resetIndex } = useQuestionSeries(SERIES_LENGTH);
  const userPreferences = useContext(UserPreferencesContext);
  const notePreferences = getNotePreference(userPreferences);

  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const onNextClick = () => {
    if (!hasNext) {
      setQuizCompleted(true);
      return;
    }
    setIsCorrect(null);
    goToNext();
    setNote(generateRandomSingleNote(notePreferences));
  }

  const handleSubmit = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setCorrectNotesCount(i => i + 1);
    }
  }

  const onPlayClick = (note: NoteDefinition) => {
    playNote(note, '1')
  }

  const handleRestart = () => {
    setNote(generateRandomSingleNote(notePreferences));
    resetIndex();
    setIsCorrect(null);
    setCorrectNotesCount(0);
    setQuizCompleted(false);
  }

  if (quizCompleted) {
    return <Container maxWidth="sm">
      <Typography variant="h5">本轮结果</Typography>
      <Divider />
      <Typography variant="body1" color="success">正确：{correctNotesCount}</Typography>
      <Typography variant="body1" color="error">错误：{SERIES_LENGTH - correctNotesCount}</Typography>
      <Box>
        <Button color="primary" onClick={handleRestart}>开始新一轮</Button>
        <Button color="secondary" onClick={goToMainPage}>返回主界面</Button>
      </Box>
    </Container>
  }

  return <>
    <SingleNoteSheet xmlDoc={xmlDoc} />
    <SingleNotePickerForm correctNote={note} isAnswerCorrect={isCorrect} onSubmit={handleSubmit} />
    <Box marginTop={1}>
      <Button color='success' onClick={() => onPlayClick(note)}><PlayArrow /></Button>
    </Box>
    <Stack width={"50%"} paddingLeft={5} marginTop={1} direction="row" spacing={2}>
      <Box flexGrow={1}>{index} / {SERIES_LENGTH}</Box>
      <NavigateNext color={"inherit"} onClick={onNextClick} />
    </Stack>
  </>
}

export default NoteToPitchTestSection;