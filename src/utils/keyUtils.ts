import { ALL_FIFTHS, Fifth } from "../constants/musicKeyConfig";
import { getRandomElement } from "./generationUtils";

export function generateRandomFifth(): Fifth {
  return getRandomElement(ALL_FIFTHS);
}