import { UserPreferences } from "../types/UserPreferencesType";

const USER_PREFERENCES_LOCAL_STORAGE_KEY = 'userPreferences'

export function loadPreferencesFromLocalStorage(defaultPreferences: UserPreferences): UserPreferences {
    const localStorageValue = localStorage.getItem(USER_PREFERENCES_LOCAL_STORAGE_KEY);
    if (localStorageValue == null) {
        return defaultPreferences;
    }

    const userPreferences = JSON.parse(localStorageValue);
    return userPreferences;
}

export function writePreferencesIntoLocalStorage(userPreferences: UserPreferences) {
    localStorage.setItem(USER_PREFERENCES_LOCAL_STORAGE_KEY, JSON.stringify(userPreferences));
}
