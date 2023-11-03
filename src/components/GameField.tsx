import { FC } from "react";
import { Row } from "./Row";
import { SquareValue } from "../assets/squareSymbols";

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
            cellsValues={rowData}
            makeMove={makeMove}
            rowIndex={index}
          />
        );
      })}
    </div>
  );
};
