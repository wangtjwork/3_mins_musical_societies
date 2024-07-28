import { useContext } from "react";
import { UserPreferencesContext } from "./UserPreferencesContextProvider";
import { PitchFormat } from "../constants/PitchFormat";
import { PitchFormatType, SheetFeatureType } from "../types/UserPreferencesType";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { SheetFeatures } from "../constants/sheetFeatures";
import FormLabel from "@mui/material/FormLabel";

function UserPreferencesSection() {
    const {
        noteToPitchTestFormat,
        setNoteToPitchTestFormat,
        sheetFeature,
        setSheetFeature
    } = useContext(UserPreferencesContext);

    return <Box minWidth={200}>
        <FormControl fullWidth>
            <FormLabel>五线谱读音名表示法</FormLabel>
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
        <Box marginTop={2}>
            <FormControl>
                <FormLabel>五线谱复杂程度</FormLabel>
                <Select
                    value={sheetFeature}
                    renderValue={() => SheetFeatures[sheetFeature as SheetFeatureType]}
                    onChange={(event) => { console.log('called', event); setSheetFeature(event.target.value as SheetFeatureType) }}
                    defaultValue=''
                >
                    {Object.entries(SheetFeatures).map(([format, chineseName]) => (
                        <MenuItem value={format} key={format}>{chineseName}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    </Box>
}

export default UserPreferencesSection;