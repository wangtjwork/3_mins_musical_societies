import { useMemo, useState } from "react";
import SingleNoteSheet from "./SingleNoteSheet";
import SingleNotePickerForm from "./SingleNotePickerForm";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { NavigateNext, PlayArrow } from "@mui/icons-material";
import { playNote } from "../utils/playSoundUtils";
import { TREBLE_CLEF_NOTES_SCIENTIFIC } from "../constants/musicNotesConfig";
import { generateSingleNoteXml, singleNoteXmlDoc } from "../utils/musicXMLUtils";
import useQuestionSeries from "../hooks/useQuestionSeries";

const SERIES_LENGTH = 20;

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

type Props = {
  goToMainPage: () => void
}

function NoteToPitchTestSection({ goToMainPage }: Props) {
  const [note, setNote] = useState<string>(getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC));
  const xmlDoc = useMemo(() => {
    return generateSingleNoteXml(singleNoteXmlDoc, note[0], note[1]);
  }, [note]);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctNotesCount, setCorrectNotesCount] = useState(0);
  const { index, hasNext, goToNext, resetIndex } = useQuestionSeries(SERIES_LENGTH);

  const quizCompleted = !hasNext && isCorrect != null;

  const onNextClick = () => {
    if (!hasNext) {
      return;
    }
    setIsCorrect(null);
    goToNext();
    setNote(getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC));
  }

  const handleSubmit = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setCorrectNotesCount(i => i + 1);
    }
  }

  const onPlayClick = (note: string) => {
    playNote(note, '1')
  }

  const handleRestart = () => {
    setNote(getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC));
    resetIndex();
    setIsCorrect(null);
    setCorrectNotesCount(0);
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
      <NavigateNext color={hasNext ? "inherit" : "disabled"} onClick={onNextClick} />
    </Stack>
  </>
}

export default NoteToPitchTestSection;