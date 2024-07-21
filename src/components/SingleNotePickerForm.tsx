import { Box, Button, FormControl, FormLabel, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserPreferencesContext } from "./UserPreferencesContextProvider";
import { convertScientificToHelmholtz } from "../utils/pitchNotationUtils";

const PICTHS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const LOWER_CASE_PITCHS = PICTHS.map(c => c.toLowerCase());
const OCTAVES = ['1', '2', '3', '4', '5', '6'];

type Props = {
    correctNote: string,
    onSubmit: (isCorrect: boolean) => void,
    isAnswerCorrect: boolean | null
};

function SingleNotePickerForm({ correctNote, onSubmit, isAnswerCorrect }: Props) {
    const [selectedPitch, setSelectedPitch] = useState<string>('');
    const [selectedOctave, setSelectedOctave] = useState<string>('');

    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [showCorrectNote, setShowCorrectNote] = useState<boolean>(false);

    const { noteToPitchTestFormat } = useContext(UserPreferencesContext);

    const convertedCorrectNote = useMemo(() => {
        return noteToPitchTestFormat == 'Helmholtz' ? convertScientificToHelmholtz(correctNote) : correctNote;
    }, [correctNote]);

    const checkNote = () => {
        setHasSubmitted(true);
        const chosenNote = selectedPitch + selectedOctave;

        if (chosenNote == convertedCorrectNote) {
            onSubmit(true);
        } else {
            onSubmit(false);
        }
    }

    useEffect(() => {
        setSelectedPitch('');
        setSelectedOctave('');
        setShowCorrectNote(false);
        setHasSubmitted(false);
    }, [correctNote]);

    const pitchOptions = noteToPitchTestFormat == 'Helmholtz' ? LOWER_CASE_PITCHS : PICTHS;

    return (
        <>
            <FormControl>
                <FormLabel>音名</FormLabel>
                <ToggleButtonGroup
                    color="primary"
                    aria-labelledby="pitch-selector-label"
                    value={selectedPitch}
                    onChange={(_, value) => setSelectedPitch(value)}
                    exclusive
                    size="large"
                    sx={{ height: 42, alignSelf: 'center' }}
                >
                    {pitchOptions.map(pitch => (<ToggleButton sx={{ 'text-transform': 'none' }} key={pitch} value={pitch}>{pitch}</ToggleButton>))}
                </ToggleButtonGroup>
                <FormLabel>组数</FormLabel>
                <ToggleButtonGroup
                    color='secondary'
                    aria-labelledby="octave-selector-label"
                    value={selectedOctave}
                    onChange={(_, val) => setSelectedOctave(val)}
                    exclusive
                    size="large"
                    sx={{ height: 42, alignSelf: 'center' }}>
                    {OCTAVES.map(octave => (<ToggleButton key={octave} value={octave}>{octave}</ToggleButton>))}
                </ToggleButtonGroup>
            </FormControl>

            <Box marginTop={1}>
                {hasSubmitted == false ? <Button variant={'outlined'} onClick={checkNote} sx={{ width: 'fit-content' }}>检查</Button> : null}
                {isAnswerCorrect != null
                    ? (
                        isAnswerCorrect
                            ? <Typography variant="body2" marginTop={1} gutterBottom color='success.main'>正确</Typography>
                            : <Typography variant="body2" marginTop={1} gutterBottom color='error.main'>错误</Typography>)
                    : null
                }
                {isAnswerCorrect == false ? (
                    <>
                        {showCorrectNote
                            ? <Typography variant="body2" marginTop={1} gutterBottom color='success.main'>{convertedCorrectNote}</Typography>
                            : <Button sx={{ width: 'fit-content' }} variant='text' onClick={() => setShowCorrectNote(true)}>显示答案</Button>}
                    </>
                ) : null}
            </Box>

        </>
    );
}

export default SingleNotePickerForm;
