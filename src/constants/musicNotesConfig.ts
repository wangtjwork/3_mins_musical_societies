import { ScientificNote } from "../types/NoteType";

const SECOND_OCTAVE: ScientificNote[] = ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2'];
const THIRD_OCTAVE: ScientificNote[] = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'];
const FOURTH_OCTAVE: ScientificNote[] = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
const FIFTH_OCTAVE: ScientificNote[] = ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5'];

export const TREBLE_CLEF_NOTES_SCIENTIFIC: ScientificNote[] =
    ['F3', 'G3', 'A3', 'B3', 'C6', 'D6', 'E6', ...FOURTH_OCTAVE, ...FIFTH_OCTAVE];

export const BASS_CLEF_NOTES_SCIENTIFIC: ScientificNote[] =
    ['A1', 'B1', 'C4', 'D4', 'E4', 'F4', 'G4', ...SECOND_OCTAVE, ...THIRD_OCTAVE];