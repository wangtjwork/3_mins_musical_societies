import { Pitches, ScientificNote } from "../types/NoteType";

const ZEROTH_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}0` as ScientificNote);
const FIRST_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}1` as ScientificNote);
const SECOND_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}2` as ScientificNote);;
const THIRD_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}3` as ScientificNote);;
const FOURTH_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}4` as ScientificNote);;
const FIFTH_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}5` as ScientificNote);;
const SIXTH_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}6` as ScientificNote);;
const SEVENTH_OCTAVE: ScientificNote[] = Pitches.map(p => `${p}7` as ScientificNote);;

export const TREBLE_CLEF_NOTES_SCIENTIFIC: ScientificNote[] =
    ['F3', 'G3', 'A3', 'B3', 'C6', 'D6', 'E6', ...FOURTH_OCTAVE, ...FIFTH_OCTAVE];
export const TREBLE_CLEF_MIN_NOTE_REGULAR = 'F3';
export const TREBLE_CLEF_MAX_NOTE_REGULAR = 'E6';

export const BASS_CLEF_NOTES_SCIENTIFIC: ScientificNote[] =
    ['A1', 'B1', 'C4', 'D4', 'E4', 'F4', 'G4', ...SECOND_OCTAVE, ...THIRD_OCTAVE];
export const BASS_CLEF_MIN_NOTE_REGULAR = 'A1';
export const BASS_CLEF_MAX_NOTE_REGULAR = 'G4';

export const TREBLE_CLEF_NOTES_SCIENTIFIC_EXTENDED: ScientificNote[] =
    ['F1', 'G1', 'A1', 'B1', 'C8', 'D8', 'E8', ...SECOND_OCTAVE, ...THIRD_OCTAVE,
        ...FOURTH_OCTAVE, ...FIFTH_OCTAVE, ...SIXTH_OCTAVE, ...SEVENTH_OCTAVE];

export const BASS_CLEF_NOTES_SCIENTIFIC_EXTENDED: ScientificNote[] =
    ['C6', 'D6', 'E6', 'F6', 'G6', ...ZEROTH_OCTAVE, ...FIRST_OCTAVE, ...SECOND_OCTAVE,
        ...THIRD_OCTAVE, ...FOURTH_OCTAVE, ...FIFTH_OCTAVE];
