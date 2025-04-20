import { useContext, useEffect, useMemo, useState } from "react";
import SingleNoteSheet from "./SingleNoteSheet";
import SingleNotePickerForm from "./SingleNotePickerForm";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { NavigateNext, PlayArrow } from "@mui/icons-material";
import { generateSingleNoteXml, SheetNoteDefinition, singleNoteXmlDoc } from "../utils/musicXMLUtils";
import useQuestionSeries from "../hooks/useQuestionSeries";
import { generateRandomSingleNote } from "../utils/noteGenerationUtils";
import { UserPreferencesContext } from "./UserPreferencesContextProvider";
import { NoteDefinition } from "../types/NoteType";
import { getNotePreference } from "../utils/UserPreferencesToNotePreferenceUtils";
import useTimeTracker from "../hooks/useTimeTracker";
import { formatSecondsToMinuteAndMaybeHour } from "../utils/timeFormatUtils";
import { Link } from "react-router";
import usePiano from "../hooks/usePiano";

const SERIES_LENGTH = 20;

function NoteToPitchTestSection() {
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

  const { startClock, restartClock, getCurrentTimeInSeconds } = useTimeTracker();
  const [completionTimeInSeconds, setCompletionTimeInSeconds] = useState<number | null>(null);

  const [isAudioLoading, playPianoNote] = usePiano();

  useEffect(() => {
    startClock();
    // use similar to componentDidMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onNextClick = () => {
    if (!hasNext) {
      setQuizCompleted(true);
      setCompletionTimeInSeconds(getCurrentTimeInSeconds());
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
    playPianoNote(note);
  }

  const handleRestart = () => {
    setNote(generateRandomSingleNote(notePreferences));
    resetIndex();
    setIsCorrect(null);
    setCorrectNotesCount(0);
    setQuizCompleted(false);
    restartClock();
  }

  const completionTimeFormatted: { minutes?: number, seconds: number, hours?: number } = useMemo(
    () => (
      completionTimeInSeconds != null
        ? formatSecondsToMinuteAndMaybeHour(completionTimeInSeconds)
        : { seconds: 0 }
    ),
    [completionTimeInSeconds]);

  if (quizCompleted) {
    const { hours, minutes, seconds } = completionTimeFormatted;

    return <Container maxWidth="sm">
      <Typography variant="h5">本轮结果</Typography>
      <Divider />
      <Typography variant="body1" color="success">正确：{correctNotesCount}</Typography>
      <Typography variant="body1" color="error">错误：{SERIES_LENGTH - correctNotesCount}</Typography>
      <Typography variant="body1" color="success">
        用时：{hours != null && `${hours}小时`}
        {minutes != null && `${minutes}分钟`}
        {seconds}秒
      </Typography>
      <Box>
        <Button color="primary" onClick={handleRestart}>开始新一轮</Button>
        <Link to="/">
          <Button color="secondary">返回主界面</Button>
        </Link>
      </Box>
    </Container>
  }

  return (
    <Stack alignItems='center'>
      <SingleNoteSheet xmlDoc={xmlDoc} />
      <SingleNotePickerForm correctNote={note} isAnswerCorrect={isCorrect} onSubmit={handleSubmit} />
      <Box marginTop={1}>
        <Button color='success' disabled={isAudioLoading} onClick={() => onPlayClick(note)}><PlayArrow /></Button>
      </Box>
      <Stack width={"50%"} paddingLeft={5} marginTop={1} direction="row" spacing={2}>
        <Box flexGrow={1}>{index} / {SERIES_LENGTH}</Box>
        <NavigateNext color={"inherit"} onClick={onNextClick} />
      </Stack>
    </Stack>
  );
}

export default NoteToPitchTestSection;