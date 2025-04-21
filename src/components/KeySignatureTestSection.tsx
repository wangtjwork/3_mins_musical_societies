import { useEffect, useMemo, useState } from "react";
import SingleNoteSheet from "./SingleNoteSheet";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { generateKeyXml, singleNoteXmlDoc } from "../utils/musicXMLUtils";
import useQuestionSeries from "../hooks/useQuestionSeries";
import useTimeTracker from "../hooks/useTimeTracker";
import { formatSecondsToMinuteAndMaybeHour } from "../utils/timeFormatUtils";
import { Link } from "react-router";
import { generateRandomFifth } from "../utils/keyUtils";
import { Fifth } from "../constants/musicKeyConfig";

const SERIES_LENGTH = 10;

function KeySignatureTestSection() {
  const [fifth, setFifth] = useState<Fifth>(generateRandomFifth());
  const xmlDoc = useMemo(() => {
    return generateKeyXml(singleNoteXmlDoc, fifth);
  }, [fifth]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctNotesCount, setCorrectNotesCount] = useState(0);
  const { index, hasNext, goToNext, resetIndex } = useQuestionSeries(SERIES_LENGTH);

  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const { startClock, restartClock, getCurrentTimeInSeconds } = useTimeTracker();
  const [completionTimeInSeconds, setCompletionTimeInSeconds] = useState<number | null>(null);

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
    setFifth(generateRandomFifth());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleSubmit = (isCorrect: boolean) => {
    setIsCorrect(isCorrect);
    if (isCorrect) {
      setCorrectNotesCount(i => i + 1);
    }
  }

  const handleRestart = () => {
    setFifth(generateRandomFifth());
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
      <Stack width={"50%"} paddingLeft={5} marginTop={1} direction="row" spacing={2}>
        <Box flexGrow={1}>{index} / {SERIES_LENGTH}</Box>
        <NavigateNext color={"inherit"} onClick={onNextClick} />
      </Stack>
    </Stack>
  );
}

export default KeySignatureTestSection;