export type SquareValue =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";
export type SquareGraphic =
  | ""
  | "🚲"
  | "🛵"
  | "🚕"
  | "🚌"
  | "🏎️"
  | "✈️"
  | "🚀"
  | "🌝"
  | "🪐"
  | "✨";

export const squareSymbols: Record<SquareValue, SquareValue> = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "10": "10",
};

export const squareSymbols2: Record<SquareValue, SquareGraphic> = {
  "0": "",
  "1": "🚲",
  "2": "🛵",
  "3": "🚕",
  "4": "🚌",
  "5": "🏎️",
  "6": "✈️",
  "7": "🚀",
  "8": "🌝",
  "9": "🪐",
  "10": "✨",
};
