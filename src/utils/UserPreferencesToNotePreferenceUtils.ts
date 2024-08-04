import { UserPreferences } from "../types/UserPreferencesType";
import { NotePreferenceConfig } from "./noteGenerationUtils";

export function getNotePreference(userPreferences: UserPreferences): NotePreferenceConfig {
    const { sheetFeature } = userPreferences;
    if (sheetFeature == 'WithOctaveShift') {
        return {
            clefs: ['treble', 'bass'],
            includeExtendedRange: true,
        }
    } else if (sheetFeature == 'TrebleAndBass') {
        return {
            clefs: ['treble', 'bass'],
            includeExtendedRange: false,
        }
    } else {
        return {
            clefs: ['treble'],
            includeExtendedRange: false
        }
    }
}