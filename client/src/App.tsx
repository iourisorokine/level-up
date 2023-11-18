import { useState, useEffect } from "react";
import { GameField } from "./components";

import { initialFieldData } from "./components/config";
import "./App.css";

import { useGameMechanics } from "./hooks/useGameMechanics";
import { useIsGameOver } from "./hooks/useIsGameOver";
import { squareSymbols2 as sqSmb, SquareValue } from "./assets/squareSymbols";

const levelReachingScores = {
  1: 30,
  2: 60,
  3: 100,
  4: 150,
  5: 220,
  6: 350,
  7: 500,
  8: 750,
  9: 1000,
  10: 1250,
  11: 1500,
};

const pointsToNextLevel = {
  1: 20,
  2: levelReachingScores[2] - levelReachingScores[1],
  3: levelReachingScores[3] - levelReachingScores[2],
  4: levelReachingScores[4] - levelReachingScores[3],
  5: levelReachingScores[5] - levelReachingScores[4],
  6: levelReachingScores[6] - levelReachingScores[5],
  7: levelReachingScores[7] - levelReachingScores[6],
  8: levelReachingScores[8] - levelReachingScores[7],
  9: levelReachingScores[9] - levelReachingScores[8],
  10: levelReachingScores[10] - levelReachingScores[9],
  11: levelReachingScores[11] - levelReachingScores[10],
};

function App() {
  const [isMoving, setIsMoving] = useState(false);
  const [fieldData, setFieldData] = useState<SquareValue[][]>(initialFieldData);
  const [nextPiece, setNextPiece] = useState<SquareValue>("1");
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [progressBarPercentage, setProgressBarPercentage] = useState<number>(0);

  const { updateFieldRecursive } = useGameMechanics(fieldData);

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
    // setTimeout(() => {
    //   setIsMoving(false);
    setFieldData(JSON.parse(JSON.stringify(updatedField)));
    setProgressBarPercentage(
      ((score +
        additionalScore -
        ((levelReachingScores as any)[level - 1] || 0)) /
        (pointsToNextLevel as any)[level]) *
        100
    );
    setScore((score) => score + additionalScore);
    // }, 200);
  };

  useEffect(() => {
    if (score >= (levelReachingScores as any)[level]) {
      setLevel((level) => level + 1);
      setProgressBarPercentage(0);
    }
  }, [score]);

  useEffect(() => {
    if (level % 2 === 0) {
      setFieldData((prevFieldData) => {
        const newFieldData = JSON.parse(JSON.stringify(prevFieldData));
        newFieldData.forEach((row: SquareValue[]) => row.push("0"));
        newFieldData.push(
          new Array(newFieldData[0].length).fill("0") as SquareValue[]
        );
        return newFieldData;
      });
    }
  }, [level]);

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
