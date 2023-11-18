import { FC } from "react";
import { Row } from "./Row";
import { SquareValue } from "../assets/squareSymbols";

export type FieldSizes = 3 | 4 | 5 | 6;

export interface GameFieldProps {
  gameData: SquareValue[][];
  makeMove: (coordinateX: number, coordinateY: number) => void;
}

export const GameField: FC<GameFieldProps> = ({ gameData, makeMove }) => {
  return (
    <div>
      {gameData.map((rowData, index) => {
        return (
          <Row
            key={index}
            fieldSize={gameData.length as FieldSizes}
            cellsValues={rowData}
            makeMove={makeMove}
            rowIndex={index}
          />
        );
      })}
    </div>
  );
};
