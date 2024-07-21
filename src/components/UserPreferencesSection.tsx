import { useContext } from "react";
import { UserPreferencesContext } from "./UserPreferencesContextProvider";
import Box from "@mui/material/Box";
import { FormControl, MenuItem, Select } from "@mui/base";
import InputLabel from "@mui/material/InputLabel";
import { PitchFormat } from "../constants/PitchFormat";
import { PitchFormatType } from "../types/UserPreferencesType";

function UserPreferencesSection() {
    const { noteToPitchTestFormat, setNoteToPitchTestFormat } = useContext(UserPreferencesContext);
    return <Box>
        <FormControl>
            <InputLabel>五线谱读音名表示法</InputLabel>
            <Select
                id="demo-simple-select"
                value={noteToPitchTestFormat}
                onChange={(_, value) => setNoteToPitchTestFormat(value as PitchFormatType)}
                defaultValue='Scientific'
            >
                {Object.entries(PitchFormat).map(([format, chineseName]) => (

                    <MenuItem value={format} key={format}>{chineseName}</MenuItem>
                ))
                }
            </Select>
        </FormControl>
    </Box>
}

export default UserPreferencesSection;