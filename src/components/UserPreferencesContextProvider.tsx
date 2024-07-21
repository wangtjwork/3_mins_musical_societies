import { createContext, useMemo, useState } from "react";
import { PitchFormatType, UserPreferences } from "../types/UserPreferencesType";
import { loadPreferencesFromLocalStorage, writePreferencesIntoLocalStorage } from "../utils/localStorageUtils";
import { defaultUserPreferences } from "../constants/defaultUserPreferences";

type UserPreferencesSetters = {
    setNoteToPitchTestFormat: (format: PitchFormatType) => void
}

export type UserPreferencesContextType = UserPreferences & UserPreferencesSetters;

export const UserPreferencesContext = createContext({
    noteToPitchTestFormat: 'Scientific',
    setNoteToPitchTestFormat: () => { }
} as UserPreferencesContextType);

type Props = {
    children?: React.ReactNode
};

function UserPreferencesContextProvider({ children }: Props) {
    const [userPreferences, setUserPreferences] = useState<UserPreferences>(
        loadPreferencesFromLocalStorage(defaultUserPreferences));

    const userPreferencesValue = useMemo<UserPreferencesContextType>(() => ({
        ...userPreferences,
        setNoteToPitchTestFormat: (format: PitchFormatType) => {
            const nextUserPreferences = {
                ...userPreferences,
                noteToPitchTestFormat: format,
            };
            setUserPreferences(nextUserPreferences);
            writePreferencesIntoLocalStorage(nextUserPreferences);
        }
    }), [userPreferences, setUserPreferences]);

    return (
        <UserPreferencesContext.Provider value={userPreferencesValue}>
            {children}
        </UserPreferencesContext.Provider>
    );
}

export default UserPreferencesContextProvider;
