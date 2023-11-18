import { SquareValue } from "../assets/squareSymbols";

export const useGameMechanics = (fieldData: SquareValue[][]) => {
  const fieldHeight = fieldData.length;
  const fieldLength = fieldData[0].length;

  const checkNeighbour = (
    coordinateX: number,
    coordinateY: number,
    value: string,
    field: string[][],
    skip: string = "none"
  ) => {
    let addToSequence = [];

    const hasNeighbourUp = coordinateY > 0;
    const hasNeighbourDown = coordinateY < fieldHeight - 1;
    const hasNeighbourLeft = coordinateX > 0;
    const hasNeighbourRight = coordinateX < fieldLength - 1;

    if (hasNeighbourDown && skip !== "down") {
      if (field[coordinateY + 1][coordinateX] === value) {
        addToSequence.push([coordinateX, coordinateY + 1]);
      }
    }
    if (hasNeighbourUp && skip !== "up") {
      if (field[coordinateY - 1][coordinateX] === value) {
        addToSequence.push([coordinateX, coordinateY - 1]);
      }
    }
    if (hasNeighbourLeft && skip !== "left") {
      if (field[coordinateY][coordinateX - 1] === value) {
        addToSequence.push([coordinateX - 1, coordinateY]);
      }
    }
    if (hasNeighbourRight && skip !== "right") {
      if (field[coordinateY][coordinateX + 1] === value) {
        addToSequence.push([coordinateX + 1, coordinateY]);
      }
    }
    console.log("addToSequence", addToSequence);
    return addToSequence;
  };

  const checkForSequence = (
    coordinateX: number,
    coordinateY: number,
    field: string[][]
  ) => {
    let piecesInSequence: number[][] = [[coordinateX, coordinateY]];

    const currentPiece = field[coordinateY][coordinateX];

    const hasNeighbourUp = coordinateY > 0;
    const hasNeighbourDown = coordinateY < fieldHeight - 1;
    const hasNeighbourLeft = coordinateX > 0;
    const hasNeighbourRight = coordinateX < fieldLength - 1;

    if (hasNeighbourDown) {
      if (field[coordinateY + 1][coordinateX] === currentPiece) {
        piecesInSequence.push([coordinateX, coordinateY + 1]);
        piecesInSequence = piecesInSequence.concat(
          checkNeighbour(
            coordinateX,
            coordinateY + 1,
            currentPiece,
            field,
            "up"
          )
        );
      }
    }
    if (hasNeighbourUp) {
      if (field[coordinateY - 1][coordinateX] === currentPiece) {
        piecesInSequence.push([coordinateX, coordinateY - 1]);
        piecesInSequence = piecesInSequence.concat(
          checkNeighbour(
            coordinateX,
            coordinateY - 1,
            currentPiece,
            field,
            "down"
          )
        );
      }
    }
    if (hasNeighbourLeft) {
      if (field[coordinateY][coordinateX - 1] === currentPiece) {
        piecesInSequence.push([coordinateX - 1, coordinateY]);
        piecesInSequence = piecesInSequence.concat(
          checkNeighbour(
            coordinateX - 1,
            coordinateY,
            currentPiece,
            field,
            "right"
          )
        );
      }
    }
    if (hasNeighbourRight) {
      if (field[coordinateY][coordinateX + 1] === currentPiece) {
        piecesInSequence.push([coordinateX + 1, coordinateY]);
        piecesInSequence = piecesInSequence.concat(
          checkNeighbour(
            coordinateX + 1,
            coordinateY,
            currentPiece,
            field,
            "left"
          )
        );
      }
    }

    const sequenceScore =
      Number(currentPiece || 0) *
      (piecesInSequence.length >= 3 ? piecesInSequence.length : 1);
    console.log({ sequenceScore, piecesInSequence });

    return {
      piecesInSequence,
      sequenceScore,
    };
  };

  const updateFieldWithSequence = (field: string[][], sequence: number[][]) => {
    const updatedField = JSON.parse(JSON.stringify(field));
    let isUpdated = false;

    if (sequence.length >= 3) {
      sequence.forEach((piece: number[], index: number) => {
        if (index === 0) {
          const newValue = (
            Number(updatedField[piece[1]][piece[0]]) + 1
          ).toString();
          updatedField[piece[1]][piece[0]] = newValue;
        } else {
          updatedField[piece[1]][piece[0]] = "0";
        }
      });
      isUpdated = true;
    }
    return { updatedField, isUpdated };
  };

  const updateFieldRecursive: any = (
    coordX: number,
    coordY: number,
    field: string[][],
    score: number = 0
  ) => {
    const { piecesInSequence: sequence, sequenceScore } = checkForSequence(
      coordX,
      coordY,
      field
    );
    const { updatedField, isUpdated } = updateFieldWithSequence(
      field,
      sequence
    );
    const updatedScore = score + sequenceScore;
    if (isUpdated) {
      return updateFieldRecursive(coordX, coordY, updatedField, updatedScore);
    }
    return { updatedField, additionalScore: updatedScore };
  };

  return {
    checkNeighbour,
    checkForSequence,
    updateFieldWithSequence,
    updateFieldRecursive,
  };
};
