export const Pitches = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
export type Pitch = typeof Pitches[number];

export const Octaves = ['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const;
export type Octave = typeof Octaves[number];

export type NoteDefinition = {
    pitch: Pitch,
    octave: Octave,
}

export type Clef = 'treble' | 'bass';

export type ScientificNote = `${Pitch}${Octave}`

export type OctaveShiftUpType = '8' | '15';
export type OctaveShiftDownType = `-${OctaveShiftUpType}`;
export type OctaveShiftType = OctaveShiftUpType | OctaveShiftDownType;

