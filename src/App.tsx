import { useEffect, useState } from "react";
import { GameField } from "./components";

import { initialFieldData } from "./components/config";
import "./App.css";

import { useGameMechanics } from "./hooks/useGameMechanics";
import { useIsGameOver } from "./hooks/useIsGameOver";
import { squareSymbols2 as sqSmb, SquareValue } from "./assets/squareSymbols";

function App() {
  const [count, setCount] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [fieldData, setFieldData] = useState<SquareValue[][]>(initialFieldData);
  const [nextPiece, setNextPiece] = useState<SquareValue>("1");
  const [score, setScore] = useState<number>(0);

  const { updateFieldRecursive } = useGameMechanics();

  const { isGameOver } = useIsGameOver(fieldData);

  const makeMove = (coordinateX: number, coordinateY: number) => {
    setIsMoving(true);
    if (fieldData[coordinateY][coordinateX] !== ("0" as SquareValue)) {
      return;
    }
    let newFieldData = JSON.parse(JSON.stringify(fieldData));
    newFieldData[coordinateY][coordinateX] = nextPiece;
    setFieldData(newFieldData);
    setNextPiece(Math.ceil(Math.random() * 3).toString() as SquareValue);

    const { updatedField, additionalScore } = updateFieldRecursive(
      coordinateX,
      coordinateY,
      newFieldData
    );

    setIsMoving(false);
    setFieldData(JSON.parse(JSON.stringify(updatedField)));
    setCount((count) => count + 1);
    setScore((score) => score + additionalScore);
  };

  return (
    <>
      <h1>{isGameOver ? "Game Over!" : "Get 3!"}</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Score: {score}</h2>
        <h2>Next: {sqSmb[nextPiece]}</h2>
        <h2>Moves: {count}</h2>
      </div>
      <div>
        <GameField gameData={fieldData} makeMove={makeMove} />
      </div>
      <h3>Align 3 of a kind to form the bigger one:</h3>
      <h2>🚲 &lt; 🚕 &lt; 🚌 &lt; 🏎️ &lt; ✈️ &lt; 🚀 &lt; ✨</h2>
    </>
  );
}

export default App;
