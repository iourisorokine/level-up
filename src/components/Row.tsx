import { FC } from "react";

import { SquareValue } from "../assets/squareSymbols";
import { Cell } from "./Cell";

const rowStyle = {
  display: "flex",
};

export interface RowProps {
  cellsValues: SquareValue[];
  rowIndex: number;
  makeMove: (coordinateX: number, coordinateY: number) => void;
}

export const Row: FC<RowProps> = ({ cellsValues, rowIndex, makeMove }) => {
  const makeMoveOnRow = (coordinateX: number) => {
    makeMove(coordinateX, rowIndex);
  };
  return (
    <div style={rowStyle}>
      {cellsValues.map((val, i) => (
        <Cell value={val} key={i} makeMoveOnRow={makeMoveOnRow} cellIndex={i} />
      ))}
    </div>
  );
};
