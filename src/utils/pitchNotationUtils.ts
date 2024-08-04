import { NoteDefinition, Pitches, ScientificNote } from "../types/NoteType";
import { SolfeggioPitches, SolfeggioPitchType } from "../types/SolfeggioType";

export function convertScientificToHelmholtz(scientificPitch: NoteDefinition): string {
    const { pitch, octave: octaveStr } = scientificPitch;
    const octave = Number(octaveStr);
    if (octave > 3) {
        return `${pitch.toLowerCase()}${octave - 3}`
    } else if (octave == 3) {
        return `${pitch.toLowerCase()}`;
    } else if (octave == 2) {
        return pitch;
    } else {
        return `${pitch}${2 - octave}`;
    }
}

export function convertNoteDefinitionToNote(noteDefinition: NoteDefinition): ScientificNote {
    return `${noteDefinition.pitch}${noteDefinition.octave}`;
}

export function convertScientificToSolfeggio(noteDefinition: NoteDefinition): SolfeggioPitchType {
    return SolfeggioPitches[Pitches.findIndex((pitch) => pitch == noteDefinition.pitch)];
}
