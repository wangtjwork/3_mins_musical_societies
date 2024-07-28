import { PitchFormat } from "../constants/PitchFormat";
import { SheetFeatures } from "../constants/sheetFeatures";

export type PitchFormatType = keyof typeof PitchFormat;
export type SheetFeatureType = keyof typeof SheetFeatures;

// This interface is serialize on client side so adding new fields would require extra attention
// to not break previous parsing logic.
export interface UserPreferences {
    noteToPitchTestFormat?: PitchFormatType,
    sheetFeature?: SheetFeatureType,
}