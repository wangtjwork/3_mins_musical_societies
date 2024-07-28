import { Octave, Pitch, ScientificNote } from "../../types/NoteType";
import { NoteDefinition } from "../musicXMLUtils";
import { convertScientificToHelmholtz } from "../pitchNotationUtils";

function convertScientificNoteToDefinition(note: string): NoteDefinition {
    return {
        pitch: note[0] as unknown as Pitch,
        octave: note[1] as unknown as Octave,
        clef: 'treble'
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

