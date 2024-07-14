import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const PICTHS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const OCTAVES = ['3', '4', '5', '6'];

type Props = { correctNote: string, onNext: () => void }

function SingleNotePickerForm({ correctNote, onNext }: Props) {
    const [selectedPitch, setSelectedPitch] = useState<string>('C');
    const [selectedOctave, setSelectedOctave] = useState<string>('0');

    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const [showCorrectNote, setShowCorrectNote] = useState<boolean>(false);

    const checkNote = () => {
        if (selectedPitch + selectedOctave == correctNote) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    useEffect(() => {
        setSelectedPitch('');
        setSelectedOctave('');
        setIsCorrect(null);
        setShowCorrectNote(false);
    }, [correctNote]);

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
                    {PICTHS.map(pitch => (<ToggleButton key={pitch} value={pitch} >{pitch}</ToggleButton>))}
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
                {isCorrect == null || isCorrect == false ? <Button variant={'outlined'} onClick={checkNote} sx={{ width: 'fit-content' }}>检查</Button> : null}
                {isCorrect == true || showCorrectNote == true ? <Button sx={{ width: 'fit-content' }} variant='contained' onClick={onNext}>下一题</Button> : null}
                {isCorrect != null
                    ? (
                        isCorrect
                            ? <Typography variant="body2" marginTop={1} gutterBottom color='success.main'>正确</Typography>
                            : <Typography variant="body2" marginTop={1} gutterBottom color='error.main'>错误</Typography>)
                    : null
                }
                {isCorrect == false ? (
                    <>
                        {showCorrectNote
                            ? <Typography variant="body2" marginTop={1} gutterBottom color='success.main'>{correctNote}</Typography>
                            : <Button sx={{ width: 'fit-content' }} variant='text' onClick={() => setShowCorrectNote(true)}>显示答案</Button>}
                    </>
                ) : null}
            </Box>

        </>
    );
}

export default SingleNotePickerForm;
