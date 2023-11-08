import { SquareValue } from "../assets/squareSymbols";

const empty = "0" as SquareValue;

export const initialFieldData: SquareValue[][] = [
  [empty, empty, empty, empty],
  [empty, empty, empty, empty],
  [empty, empty, empty, empty],
  [empty, empty, empty, empty],
];

export const fieldLength = initialFieldData[0].length;

export const fieldHeight = initialFieldData.length;
