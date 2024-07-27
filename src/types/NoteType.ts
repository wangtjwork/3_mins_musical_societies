export const Pitches = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
export type Pitch = typeof Pitches[number];

export const Octaves = ['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const;
export type Octave = typeof Octaves[number];
export type Clef = 'treble' | 'bass';

export type ScientificNote = `${Pitch}${Octave}`

