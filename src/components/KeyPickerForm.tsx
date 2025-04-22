import { FormControl, FormLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Accidental, Pitch, Pitches } from "../types/NoteType";
import { useState } from "react";

const PITCHES = Pitches;
const ACCIDENTALS = {
  'flat': '\u266D',
  'sharp': '\u266f'
}; // we only care about flat or sharp for basic use cases

export default function KeyPickerForm() {
  const [selectedPitch, setSelectedPitch] = useState<Pitch | ''>('');
  const [selectedAccidental, setSelectedAccidental] = useState<Accidental | ''>('');

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
    </>
  )
}