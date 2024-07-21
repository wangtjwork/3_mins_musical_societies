import { PitchFormat } from "../constants/PitchFormat";

export type PitchFormatType = keyof typeof PitchFormat;

// This interface is serialize on client side so adding new fields would require extra attention
// to not break previous parsing logic.
export interface UserPreferences {
    noteToPitchTestFormat?: PitchFormatType
}