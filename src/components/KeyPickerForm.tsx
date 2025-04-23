import { Box, Button, FormControl, FormLabel, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Accidental, Key, Pitch, Pitches } from "../types/NoteType";
import { useMemo, useState } from "react";
import { Fifth, FIFTHS_TO_MAJOR_KEYS } from "../constants/musicKeyConfig";
import { convertFifthToChineseKeyNames } from "../utils/keyUtils";

const PITCHES = Pitches;
const ACCIDENTALS = {
  'flat': '\u266D',
  'sharp': '\u266f'
}; // we only care about flat or sharp for basic use cases

type Props = {
  onSubmit: (isCorrect: boolean) => void,
  answer: Fifth,
  isCorrect: boolean | null,
}

export default function KeyPickerForm({ onSubmit, answer, isCorrect }: Props) {
  const [selectedPitch, setSelectedPitch] = useState<Pitch | ''>('');
  const [selectedAccidental, setSelectedAccidental] = useState<Accidental | ''>('');

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const checkCorrectness = () => {
    setHasSubmitted(true);
    if (selectedPitch === '') {
      onSubmit(false);
      return;
    }
    const chosenKey: Key = selectedAccidental === '' ? selectedPitch : `${selectedPitch} ${selectedAccidental}`;

    const correctKeys = FIFTHS_TO_MAJOR_KEYS[answer];
    if (correctKeys.includes(chosenKey)) {
      onSubmit(true);
    } else {
      onSubmit(false);
    }
  }

  const userFriendlyAnswer = useMemo(() => {
    return convertFifthToChineseKeyNames(answer);
  }, [answer])

  return (
    <>
      <FormControl>
        <FormLabel>音名</FormLabel>
        <ToggleButtonGroup
          color="primary"
          aria-labelledby="pitch-selector-label"
          value={selectedPitch}
          onChange={(_, val: Pitch | null) => setSelectedPitch(val ?? '')}
          exclusive
          size="large"
          sx={{ height: 42, alignSelf: 'center' }}>
          {
            PITCHES.map(pitch => (
              <ToggleButton
                sx={{ 'textTransform': 'none' }}
                key={pitch}
                value={pitch}
              >
                {pitch}
              </ToggleButton>
            ))}
        </ToggleButtonGroup>
        <FormLabel sx={{ marginTop: 1 }}>升降调</FormLabel>
        <ToggleButtonGroup
          color="primary"
          aria-labelledby="pitch-selector-label"
          value={selectedAccidental}
          onChange={(_, val: Accidental | null) => setSelectedAccidental(val ?? '')}
          exclusive
          size="large"
          sx={{ height: 42, alignSelf: 'center' }}>
          {Object.entries(ACCIDENTALS).map(([accidental, unicode]) => (
            <ToggleButton
              key={accidental}
              value={accidental}
            >
              {unicode}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </FormControl>

      <Box marginTop={1}>
        {hasSubmitted == false ? <Button variant={'outlined'} onClick={checkCorrectness} sx={{ width: 'fit-content' }}>检查</Button> : null}
        {isCorrect != null &&
          (
            isCorrect
              ? <Typography variant="body2" marginTop={1} gutterBottom color='success.main'>正确</Typography>
              : <Typography variant="body2" marginTop={1} gutterBottom color='error.main'>错误</Typography>
          )
        }
        {isCorrect === false && (
          showAnswer ? <Typography variant="body2" marginTop={1} gutterBottom color='success.main'>{userFriendlyAnswer}</Typography>
            : <Button sx={{ width: 'fit-content' }} variant='text' onClick={() => setShowAnswer(true)}>显示答案</Button>
        )}
      </Box>
    </>
  )
}