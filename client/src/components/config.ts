import { SquareValue } from "../assets/squareSymbols";

const empty = "0" as SquareValue;

export const initialFieldData: SquareValue[][] = [
  [empty, empty, empty],
  [empty, empty, empty],
  [empty, empty, empty],
];

export const MAX_REACHABLE_LEVEL = 10;

export const levelReachingScores = {
  1: 30,
  2: 60,
  3: 100,
  4: 150,
  5: 220,
  6: 350,
  7: 500,
  8: 750,
  9: 1000,
  10: 1250,
  11: 1500,
  12: 2000,
};

export const pointsToNextLevel = {
  1: 20,
  2: levelReachingScores[2] - levelReachingScores[1],
  3: levelReachingScores[3] - levelReachingScores[2],
  4: levelReachingScores[4] - levelReachingScores[3],
  5: levelReachingScores[5] - levelReachingScores[4],
  6: levelReachingScores[6] - levelReachingScores[5],
  7: levelReachingScores[7] - levelReachingScores[6],
  8: levelReachingScores[8] - levelReachingScores[7],
  9: levelReachingScores[9] - levelReachingScores[8],
  10: levelReachingScores[10] - levelReachingScores[9],
  11: levelReachingScores[11] - levelReachingScores[10],
  12: levelReachingScores[12] - levelReachingScores[11],
};
