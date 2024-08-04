import { Synth } from "tone";
import { NoteDefinition } from "../types/NoteType";

export function playNote(note: NoteDefinition, length: string) {
    const synth = new Synth();
    synth.oscillator.type = 'sine';
    synth.toDestination();
    synth.triggerAttackRelease(note.pitch + note.octave, length);
}