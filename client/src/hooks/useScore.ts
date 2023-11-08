import { useState } from "react";

export const useScore = () => {
  const [score, setScore] = useState(0);

  const updateScore = (latestMove: string, isSequenceCreated: boolean) => {
    const additionalPoints = isSequenceCreated
      ? Math.pow(Number(latestMove), 2)
      : Number(latestMove);

    return setScore((prevScore) => prevScore + additionalPoints);
  };

  return { score, updateScore };
};
