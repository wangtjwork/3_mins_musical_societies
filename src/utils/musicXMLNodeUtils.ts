import { Clef, OctaveShiftType } from "../types/NoteType";

export function clefToMusicXmlNodes(clef: Clef): string {
    if (clef == 'treble') {
        return `
          <sign>G</sign>
          <line>2</line>`;
    } else if (clef == 'bass') {
        return `
          <sign>F</sign>
          <line>4</line>`;
    } else {
        throw new Error('unsupported clef type detected');
    }
}

export function octaveShiftToMusicXmlNodes(octaveShift: OctaveShiftType): string {
    const octaveShiftSize = Math.abs(Number(octaveShift));
    return `<octave-shift size="${octaveShiftSize}" type="${Number(octaveShift) > 0 ? "down" : "up"}" 
        default-y="33" dash-length="7.5" space-length="7.5"/>`;
}
