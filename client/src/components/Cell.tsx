import { FC, useState } from "react";

import { SquareValue, squareSymbols2 as sqSmb } from "../assets/squareSymbols";

export interface CellProps {
  value: SquareValue;
  cellIndex: number;
  makeMoveOnRow: (coordinateX: number) => void;
}

export const Cell: FC<CellProps> = ({ value, cellIndex, makeMoveOnRow }) => {
  const [isHover, setIsHover] = useState(false);

  const cellStyle = {
    height: isHover ? 76 : 80,
    width: isHover ? 76 : 80,
    backgroundColor: isHover ? "#eaeaea" : "#ddd",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: isHover ? 6 : 4,
    cursor: "pointer",
    fontSize: 32,
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
