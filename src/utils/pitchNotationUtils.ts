export function convertScientificToHelmholtz(scientificPitch: string): string {
    if (scientificPitch.length != 2) {
        throw Error(`pitch not supported ${scientificPitch}`);
    }

    const pitchNote = scientificPitch[0];
    const octave = parseInt(scientificPitch[1]);
    if (octave > 3) {
        return `${pitchNote.toLowerCase()}${octave - 3}`
    } else if (octave == 3) {
        return `${pitchNote.toLowerCase()}`;
    } else if (octave == 2) {
        return pitchNote;
    } else {
        return `${pitchNote}${2 - octave}`;
    }
}
