import { ALL_FIFTHS, Fifth, FIFTHS_TO_MAJOR_KEYS } from "../constants/musicKeyConfig";
import { getRandomElement } from "./generationUtils";

export function generateRandomFifth(): Fifth {
  return getRandomElement(ALL_FIFTHS);
}

export function convertFifthToChineseKeyNames(fifth: Fifth): string {
  const correctKeys = FIFTHS_TO_MAJOR_KEYS[fifth];
  return correctKeys.map(key => {
    const [pitch, accidental] = key.split(' ');
    if (accidental === undefined) {
      return `${pitch}大调`
    } else {
      return `${accidental === 'flat' ? '降' : '升'}${pitch}大调`
    }
  }).join(' 或 ');
}