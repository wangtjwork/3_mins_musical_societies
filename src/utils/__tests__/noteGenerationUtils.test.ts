import { appendOctaveShiftToSheetNoteDefinition } from "../noteGenerationUtils";

describe('append octave shift', () => {

    describe('treble clef', () => {
        it('15 va', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'C',
                octave: '8',
                clef: 'treble'
            });
            expect(result).toEqual({
                pitch: 'C',
                octave: '8',
                clef: 'treble',
                octaveShift: '15'
            })
        })

        it('8 va', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'D',
                octave: '7',
                clef: 'treble'
            });
            expect(result).toEqual({
                pitch: 'D',
                octave: '7',
                clef: 'treble',
                octaveShift: '8'
            })
        })

        it('within range', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'E',
                octave: '6',
                clef: 'treble'
            });
            expect(result).toEqual({
                pitch: 'E',
                octave: '6',
                clef: 'treble'
            })
        })

        it('8 vb', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'B',
                octave: '2',
                clef: 'treble'
            });
            expect(result).toEqual({
                pitch: 'B',
                octave: '2',
                clef: 'treble',
                octaveShift: '-8'
            })
        })

        it('15 vb', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'F',
                octave: '1',
                clef: 'treble'
            });
            expect(result).toEqual({
                pitch: 'F',
                octave: '1',
                clef: 'treble',
                octaveShift: '-15'
            })
        })
    })

    describe('bass clef', () => {
        it('15 va', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'B',
                octave: '5',
                clef: 'bass'
            });
            expect(result).toEqual({
                pitch: 'B',
                octave: '5',
                clef: 'bass',
                octaveShift: '15'
            })
        });

        it('8 va', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'G',
                octave: '5',
                clef: 'bass'
            });
            expect(result).toEqual({
                pitch: 'G',
                octave: '5',
                clef: 'bass',
                octaveShift: '8'
            })
        })

        it('within range', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'E',
                octave: '4',
                clef: 'bass'
            });
            expect(result).toEqual({
                pitch: 'E',
                octave: '4',
                clef: 'bass'
            })
        })

        it('8 vb', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'A',
                octave: '0',
                clef: 'bass'
            });
            expect(result).toEqual({
                pitch: 'A',
                octave: '0',
                clef: 'bass',
                octaveShift: '-8'
            })
        })

        it('15 vb', () => {
            const result = appendOctaveShiftToSheetNoteDefinition({
                pitch: 'C',
                octave: '0',
                clef: 'bass'
            });
            expect(result).toEqual({
                pitch: 'C',
                octave: '0',
                clef: 'bass',
                octaveShift: '-15'
            })
        })
    })
})