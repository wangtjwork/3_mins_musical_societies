import { Synth } from "tone";

export function playNote(note: string, length: string) {
    const synth = new Synth();
    synth.oscillator.type = 'sine';
    synth.toDestination();
    synth.triggerAttackRelease(note, length);
}