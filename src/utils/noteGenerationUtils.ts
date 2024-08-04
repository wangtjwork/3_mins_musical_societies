import { BASS_CLEF_NOTES_SCIENTIFIC, TREBLE_CLEF_NOTES_SCIENTIFIC } from "../constants/musicNotesConfig";
import { Clef, NoteDefinition, Octave, Pitch, ScientificNote } from "../types/NoteType";
import { SheetNoteDefinition } from "./musicXMLUtils";

export type NotePreferenceConfig = {
    clefs: Clef[]
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
        const note = generateRandomSingleNoteFromClef(clefs[0]);
        return {
            ...parseNoteToDefinition(note),
            clef: clefs[0]
        };
    } else {
        const [note, clef] = generateRandomSingleNoteFromClefs(clefs);
        return {
            ...parseNoteToDefinition(note),
            clef
        };
    }
}

export function generateRandomSingleNoteFromClef(clef: Clef): ScientificNote {
    if (clef == 'bass') {
        return getRandomElement(BASS_CLEF_NOTES_SCIENTIFIC);
    } else if (clef == 'treble') {
        return getRandomElement(TREBLE_CLEF_NOTES_SCIENTIFIC)
    }
    throw new Error('Unsupported clef type');
}

export function generateRandomSingleNoteFromClefs(clefs: Clef[]): [ScientificNote, Clef] {
    const clef = getRandomElement(clefs);
    return [generateRandomSingleNoteFromClef(clef), clef];
}
