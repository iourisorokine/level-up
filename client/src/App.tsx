import { useState, useEffect } from "react";
import { GameField } from "./components";

import { initialFieldData, levelReachingScores } from "./components/config";
import "./App.css";

import {
  canLevelUp,
  calculateProgressBarPercentage,
  getLevelUpMessage,
} from "./components/utils";

import { useGameMechanics } from "./hooks/useGameMechanics";
import { useIsGameOver } from "./hooks/useIsGameOver";
import { squareSymbols2 as sqSmb, SquareValue } from "./assets/squareSymbols";

const DEFAULT_MESSAGE = "Align 3 of a kind!";

function App() {
  // const [isMoving, setIsMoving] = useState(false);
  const [message, setMessage] = useState<string>(DEFAULT_MESSAGE);
  const [fieldData, setFieldData] = useState<SquareValue[][]>(initialFieldData);
  const [nextPiece, setNextPiece] = useState<SquareValue>("1");
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [progressBarPercentage, setProgressBarPercentage] = useState<number>(0);

  const { updateFieldRecursive } = useGameMechanics(fieldData);

  const { isGameOver } = useIsGameOver(fieldData);
  const makeMove = (coordinateX: number, coordinateY: number) => {
    // setIsMoving(true);
    if (fieldData[coordinateY][coordinateX] !== ("0" as SquareValue)) {
      return;
    }
    let newFieldData = JSON.parse(JSON.stringify(fieldData));
    newFieldData[coordinateY][coordinateX] = nextPiece;
    setFieldData(newFieldData);
    setNextPiece(
      Math.ceil(Math.random() * 3 + (level - 1) / 2).toString() as SquareValue
    );

    const { updatedField, additionalScore } = updateFieldRecursive(
      coordinateX,
      coordinateY,
      newFieldData
    );
    // setTimeout(() => {
    //   setIsMoving(false);
    setFieldData(JSON.parse(JSON.stringify(updatedField)));
    setProgressBarPercentage(
      calculateProgressBarPercentage({ score, additionalScore, level })
    );
    setScore((score) => score + additionalScore);
    // }, 200);
  };

  useEffect(() => {
    if (score >= (levelReachingScores as any)[level] && canLevelUp(level)) {
      setMessage(getLevelUpMessage(level));
      setLevel((level) => level + 1);
      setProgressBarPercentage(0);
      setTimeout(() => {
        setMessage(DEFAULT_MESSAGE);
      }, 2000);
    }
  }, [score]);

  useEffect(() => {
    if (isGameOver) setMessage("Game Over!");
  }, [isGameOver]);

  useEffect(() => {
    if (level % 3 === 0 && !(level > 9)) {
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
      <h1 style={{ fontSize: 36 }}>{message}</h1>
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
