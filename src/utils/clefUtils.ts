import { Clef } from "../types/NoteType";

export default function clefToMusicXmlNodes(clef: Clef): string {
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