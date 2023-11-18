import { FC, useState } from "react";

import { SquareValue, squareSymbols2 as sqSmb } from "../assets/squareSymbols";
import { FieldSizes } from "./GameField";

const sizes = {
  3: {
    cell: 94,
    cellHover: 90,
    cellMargin: 6,
    cellHoverMargin: 8,
    font: 38,
  },
  4: {
    cell: 80,
    cellHover: 76,
    cellMargin: 4,
    cellHoverMargin: 6,
    font: 32,
  },
  5: {
    cell: 64,
    cellHover: 60,
    cellMargin: 4,
    cellHoverMargin: 6,
    font: 26,
  },
  6: {
    cell: 56,
    cellHover: 52,
    cellMargin: 2,
    cellHoverMargin: 4,
    font: 22,
  },
};

export interface CellProps {
  value: SquareValue;
  cellIndex: number;
  fieldSize?: FieldSizes;
  makeMoveOnRow: (coordinateX: number) => void;
}
const DEFAULT_SIZE = 4;

export const Cell: FC<CellProps> = ({
  value,
  cellIndex,
  makeMoveOnRow,
  fieldSize = DEFAULT_SIZE,
}) => {
  const [isHover, setIsHover] = useState(false);

  const cellStyle = {
    height: isHover ? sizes[fieldSize].cellHover : sizes[fieldSize].cell,
    width: isHover ? sizes[fieldSize].cellHover : sizes[fieldSize].cell,
    backgroundColor: isHover ? "#eaeaea" : "#ddd",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: isHover
      ? sizes[fieldSize].cellHoverMargin
      : sizes[fieldSize].cellMargin,
    cursor: "pointer",
    fontSize: sizes[fieldSize].font,
    fontWeight: "bold",
    onmouseover: "this.backgroundColor='#aaa'",
  };

  const handleMouseEnter = () => {
    if (+value === 0) setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handleClick = () => {
    makeMoveOnRow(cellIndex);
  };
  return (
    <div
      style={cellStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {+value > 0 && sqSmb[value]}
    </div>
  );
};
