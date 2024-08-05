import {
    BASS_CLEF_MAX_NOTE_REGULAR,
    BASS_CLEF_MIN_NOTE_REGULAR,
    BASS_CLEF_NOTES_SCIENTIFIC,
    BASS_CLEF_NOTES_SCIENTIFIC_EXTENDED,
    TREBLE_CLEF_MAX_NOTE_REGULAR,
    TREBLE_CLEF_MIN_NOTE_REGULAR,
    TREBLE_CLEF_NOTES_SCIENTIFIC,
    TREBLE_CLEF_NOTES_SCIENTIFIC_EXTENDED
} from "../constants/musicNotesConfig";
import { Clef, NoteDefinition, Octave, Pitch, ScientificNote } from "../types/NoteType";
import { SheetNoteDefinition } from "./musicXMLUtils";

export type NotePreferenceConfig = {
    clefs: Clef[],
    includeExtendedRange: boolean,
}

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function parseNoteToDefinition(note: ScientificNote): NoteDefinition {
    const pitch = note[0] as unknown as Pitch;
    const octave = note[1] as unknown as Octave;
    return {
        pitch,
        octave
    }
}

export function generateRandomSingleNote(config: NotePreferenceConfig): SheetNoteDefinition {
    const { clefs } = config;

    if (clefs.length == 1) {
        const note = generateRandomSingleNoteFromSingleClefConfig(config);
        return appendOctaveShiftToSheetNoteDefinition({
            ...parseNoteToDefinition(note),
            clef: clefs[0]
        });
    } else {
        const [note, clef] = generateRandomSingleNoteFromMultiClefsConfig(config);
        return appendOctaveShiftToSheetNoteDefinition({
            ...parseNoteToDefinition(note),
            clef
        });
    }
}

export function generateRandomSingleNoteFromSingleClefConfig(config: NotePreferenceConfig): ScientificNote {
    const { clefs, includeExtendedRange } = config;
    const clef = clefs[0];
    if (clef == 'bass') {
        return includeExtendedRange
            ? getRandomElement(BASS_CLEF_NOTES_SCIENTIFIC_EXTENDED)
            : getRandomElement(BASS_CLEF_NOTES_SCIENTIFIC);
    } else if (clef == 'treble') {
        return includeExtendedRange
            ? getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC_EXTENDED)
            : getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC);
    }
    throw new Error('Unsupported clef type');
}

export function generateRandomSingleNoteFromMultiClefsConfig(config: NotePreferenceConfig)
    : [ScientificNote, Clef] {
    const clef = getRandomElement(config.clefs);
    return [generateRandomSingleNoteFromSingleClefConfig({ ...config, clefs: [clef] }), clef];
}

export function appendOctaveShiftToSheetNoteDefinition(note: SheetNoteDefinition): SheetNoteDefinition {
    const { clef, pitch, octave } = note;
    const scientificNote: ScientificNote = `${pitch}${octave}`;

    // check if note is not in range of needing octave shift
    if (clef == 'bass' && BASS_CLEF_NOTES_SCIENTIFIC.includes(scientificNote)) {
        return note;
    }
    if (clef == 'treble' && TREBLE_CLEF_NOTES_SCIENTIFIC.includes(scientificNote)) {
        return note;
    }

    const maxRegularLevel = getLevel(parseNoteToDefinition(
        clef == 'bass' ? BASS_CLEF_MAX_NOTE_REGULAR : TREBLE_CLEF_MAX_NOTE_REGULAR
    ));
    const minRegularLevel = getLevel(parseNoteToDefinition(
        clef == 'bass' ? BASS_CLEF_MIN_NOTE_REGULAR : TREBLE_CLEF_MIN_NOTE_REGULAR
    ));

    let noteLevel = getLevel(note);

    if (noteLevel > maxRegularLevel) {
        let downBy = 0;
        while (noteLevel > maxRegularLevel) {
            downBy++;
            const moveDown8 = {
                ...note,
                octave: ('' + (Number(note.octave) - downBy)) as Octave
            };
            noteLevel = getLevel(moveDown8);
        }
        return {
            ...note,
            octaveShift: downBy == 1 ? '8' : '15',
        }
    } else {
        let upBy = 0;
        while (noteLevel < minRegularLevel) {
            upBy++
            const moveUp8 = {
                ...note,
                octave: '' + (Number(note.octave) + upBy) as Octave,
            };
            noteLevel = getLevel(moveUp8);
        }
        return {
            ...note,
            octaveShift: upBy == 1 ? '-8' : '-15'
        }
    }
}

// easy hashing of a note, using octave * 12 plus index of pitch as second digit
// to help comparing between two notes,
// for example - C4 => 48, B4 => 59, A0 => 5, 
function getLevel(note: NoteDefinition): number {
    return Number(note.octave) * 12 + PITCH_TO_LEVEL[note.pitch];
}

const PITCH_TO_LEVEL: {
    [K in Pitch]: number;
} = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11
} as const;
