import { FC } from "react";

import { SquareValue } from "../assets/squareSymbols";
import { Cell } from "./Cell";
import { FieldSizes } from "./GameField";

const rowStyle = {
  display: "flex",
};

export interface RowProps {
  cellsValues: SquareValue[];
  rowIndex: number;
  fieldSize?: FieldSizes;
  makeMove: (coordinateX: number, coordinateY: number) => void;
}

export const Row: FC<RowProps> = ({
  cellsValues,
  rowIndex,
  makeMove,
  fieldSize,
}) => {
  const makeMoveOnRow = (coordinateX: number) => {
    makeMove(coordinateX, rowIndex);
  };
  return (
    <div style={rowStyle}>
      {cellsValues.map((val, i) => (
        <Cell
          value={val}
          fieldSize={fieldSize}
          key={i}
          makeMoveOnRow={makeMoveOnRow}
          cellIndex={i}
        />
      ))}
    </div>
  );
};
