import type { Session } from "./types";

var Scrambow = require('scrambow').Scrambow;


// Scramble generator object
export const sg = new Scrambow();

// Default value for sessions list
export const DEFAULT_SESSIONS: Session[] = [{
  name: "test",
  cube: "3x3",
  solves: [],
}];
