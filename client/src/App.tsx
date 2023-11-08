import { useState, useEffect } from "react";
import { GameField } from "./components";

import { initialFieldData } from "./components/config";
import "./App.css";

import { useGameMechanics } from "./hooks/useGameMechanics";
import { useIsGameOver } from "./hooks/useIsGameOver";
import { squareSymbols2 as sqSmb, SquareValue } from "./assets/squareSymbols";

const levelReachingScores = {
  1: 20,
  2: 50,
  3: 120,
  4: 250,
  5: 500,
  6: 750,
  7: 1000,
  8: 1500,
  9: 2000,
};

const pointsToNextLevel = {
  1: 20,
  2: 30,
  3: 70,
  4: 130,
  5: 250,
  6: 250,
  7: 250,
  8: 500,
  9: 1000,
};

function App() {
  // const [isMoving, setIsMoving] = useState(false);
  const [fieldData, setFieldData] = useState<SquareValue[][]>(initialFieldData);
  const [nextPiece, setNextPiece] = useState<SquareValue>("1");
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [progressBarPercentage, setProgressBarPercentage] = useState<number>(0);

  const { updateFieldRecursive } = useGameMechanics();

  const { isGameOver } = useIsGameOver(fieldData);

  const makeMove = (coordinateX: number, coordinateY: number) => {
    // setIsMoving(true);
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

    // setIsMoving(false);
    setFieldData(JSON.parse(JSON.stringify(updatedField)));
    setProgressBarPercentage(
      ((score +
        additionalScore -
        ((levelReachingScores as any)[level - 1] || 0)) /
        (pointsToNextLevel as any)[level]) *
        100
    );
    setScore((score) => score + additionalScore);
  };

  useEffect(() => {
    if (score >= (levelReachingScores as any)[level]) {
      setLevel((level) => level + 1);
      setProgressBarPercentage(0);
    }
  }, [score]);

  return (
    <>
      <h1>{isGameOver ? "Game Over!" : "Level-up!"}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          style={{
            width: 250,
            position: "relative" as any,
            padding: 3,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "50%",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Score: {score}
          </span>
          <div
            style={{
              height: 40,
              backgroundColor: "green",
              width: `${progressBarPercentage}%`,
              borderRadius: 4,
            }}
          ></div>
        </div>
        <h2 style={{ margin: 0 }}>Level {level}</h2>
        <h2 style={{ margin: 0, marginBottom: 12 }}>
          Next: {sqSmb[nextPiece]}
        </h2>
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
