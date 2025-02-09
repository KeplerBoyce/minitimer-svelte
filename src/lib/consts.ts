import type { CubeType, Session } from "./types";

var Scrambow = require('scrambow').Scrambow;


// Scramble generator object
export const SG = new Scrambow();

// Default value for sessions list
export const DEFAULT_SESSIONS: Session[] = [{
  name: "test",
  cube: "3x3",
  solves: [],
}];

// Array of all cube types
export const CUBE_TYPES: CubeType[] = [
  "2x2",
  "3x3",
  "4x4",
  "5x5",
  "6x6",
  "7x7",
  "Skewb",
  "Clock",
  "Megaminx",
  "Pyraminx",
  "Square-1",
];

// Mapping from CubeTypes to Scrambow type strings
export const CUBE_TYPE_MAP: Record<CubeType, string> = {
  "2x2": "222",
  "3x3": "333",
  "4x4": "444",
  "5x5": "555",
  "6x6": "666",
  "7x7": "777",
  "Megaminx": "megaminx",
  "Pyraminx": "pyraminx",
  "Square-1": "square1",
  "Skewb": "skewb",
  "Clock": "clock"
};
