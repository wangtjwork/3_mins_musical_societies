import { Key } from "../types/NoteType";


export const ALL_FIFTHS = ['0', '1', '2', '3', '4', '5', '6', '7', '-1', '-2', '-3', '-4', '-5', '-6', '-7'] as const;
export type Fifth = typeof ALL_FIFTHS[number];

export const FIFTHS_TO_MAJOR_KEYS: {
  [K in Fifth]: Key[];
} = {
  '0': ['C'],
  '1': ['G'],
  '2': ['D'],
  '3': ['A'],
  '4': ['E'],
  '5': ['B', 'C flat'],
  '6': ['F sharp', 'G flat'],
  '7': ['C sharp', 'D flat'],
  '-1': ['F'],
  '-2': ['B flat'],
  '-3': ['E flat'],
  '-4': ['A flat'],
  '-5': ['C sharp', 'D flat'],
  '-6': ['F sharp', 'G flat'],
  '-7': ['B', 'C flat']
}

