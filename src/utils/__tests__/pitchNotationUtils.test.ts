import { NoteDefinition, Octave, Pitch } from "../../types/NoteType";
import { convertScientificToHelmholtz, convertScientificToSolfeggio } from "../pitchNotationUtils";

function convertScientificNoteToDefinition(note: string): NoteDefinition {
    return {
        pitch: note[0] as unknown as Pitch,
        octave: note[1] as unknown as Octave
    }
}

describe('scientific To Helmholtz', () => {
    describe.each(
        [['C4', 'c1'], ['B5', 'b2'], ['A6', 'a3'], ['G7', 'g4'],
        ['F3', 'f'], ['E2', 'E'], ['D1', 'D1'], ['B0', 'B2']]
    )('from %s to %s', (from: string, to: string) => {
        test('convert accurate', () => {
            const note = convertScientificNoteToDefinition(from);
            expect(convertScientificToHelmholtz(note)).toEqual(to);
        })
    })
})

describe('scientific to Solfeggio', () => {
    describe.each(
        [['C1', 'do'], ['D2', 're'], ['E3', 'mi'], ['F4', 'fa'],
        ['G2', 'sol'], ['A5', 'la'], ['B1', 'xi']]
    )('from %s to %s', (from: string, to: string) => {
        test('convert accurate', () => {
            const note = convertScientificNoteToDefinition(from);
            expect(convertScientificToSolfeggio(note)).toEqual(to);
        });
    });
})
