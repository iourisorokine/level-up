export const useIsGameOver = (fieldData: string[][]) => {
  const isGameOver = fieldData.every((row) =>
    row.every((cell) => cell !== "0")
  );
  return { isGameOver };
};
