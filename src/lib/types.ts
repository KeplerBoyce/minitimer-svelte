export type Session = {
  name: string,
  cube: CubeType,
  solves: Solve[],
};

export type Solve = {
  scramble: string,
  time: number, // In milliseconds
  timeMod: TimeMod,
  timestamp: Date,
};

// Cube type for a session, determines scramble type
export type CubeType = "2x2" | "3x3" | "4x4" | "5x5" | "6x6" | "7x7"
    | "Megaminx" | "Pyraminx" | "Square-1" | "Skewb" | "Clock";

// Time modifier for tracking +2s and DNFs
export type TimeMod = "None" | "+2" | "DNF";

// Types for a list of times when printing average of N solves
export type AoNTime = {
  time: string,
  outlier: boolean,
}
export type AoN = {
  average: string,
  times: AoNTime[],
};
