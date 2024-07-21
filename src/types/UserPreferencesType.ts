export type PitchFormat = 'Helmholtz' | 'Scientific' | 'Solfeggio' | 'Numbered';

// This interface is serialize on client side so adding new fields would require extra attention
// to not break previous parsing logic.
export interface UserPreferences {
    noteToPitchTestFormat?: PitchFormat
}