import { useContext } from "react";
import { UserPreferencesContext } from "./UserPreferencesContextProvider";
import InputLabel from "@mui/material/InputLabel";
import { PitchFormat } from "../constants/PitchFormat";
import { PitchFormatType } from "../types/UserPreferencesType";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

function UserPreferencesSection() {
    const { noteToPitchTestFormat, setNoteToPitchTestFormat } = useContext(UserPreferencesContext);
    return <Box minWidth={200}>
        <FormControl fullWidth>
            <InputLabel>五线谱读音名表示法</InputLabel>
            <Select
                value={noteToPitchTestFormat}
                renderValue={() => PitchFormat[noteToPitchTestFormat as PitchFormatType]}
                onChange={(event) => setNoteToPitchTestFormat(event.target.value as PitchFormatType)}
                defaultValue='Scientific'
            >
                {Object.entries(PitchFormat).map(([format, chineseName]) => (
                    <MenuItem value={format} key={format}>{chineseName}</MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
}

export default UserPreferencesSection;