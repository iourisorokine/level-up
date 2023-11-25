import {
  MAX_REACHABLE_LEVEL,
  levelReachingScores,
  pointsToNextLevel,
} from "./config";

export const canLevelUp = (level: number): boolean => {
  return level < MAX_REACHABLE_LEVEL;
};

type CalculateProgressBarPercentageArgs = {
  score: number;
  additionalScore: number;
  level: number;
};

export const calculateProgressBarPercentage = ({
  score,
  additionalScore,
  level,
}: CalculateProgressBarPercentageArgs) => {
  return (
    ((score +
      additionalScore -
      ((levelReachingScores as any)[level - 1] || 0)) /
      (pointsToNextLevel as any)[level]) *
    100
  );
};

export const getLevelUpMessage = (level: number) => {
  return (level + 1) % 3 === 0 && !(level > 9)
    ? "Field extended!"
    : `Level ${level + 1}!`;
};
