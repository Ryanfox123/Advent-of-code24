import fs from "fs";
const text = fs.readFileSync("./day4.text", "utf8");

const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const checkFull = (wordsearch: string): void => {
  const splitByLine = wordsearch.split("\n");
  const lineLength = splitByLine[0].length;
  let total = 0;

  for (const line of splitByLine) {
    total += checkStraight(line);
  }
  for (let i = 0; i < splitByLine.length; i++) {
    for (let j = 0; j < lineLength; j++) {
      if (splitByLine[i][j] === "X") {
        total += checkVertical(splitByLine, i, j);
        total += checkDiagonal(splitByLine, i, j);
      }
    }
  }

  console.log(total);
};

const checkStraight = (str: string): number => {
  const matches = str.match(/(?=(XMAS|SAMX))/g);
  return matches?.length || 0;
};

const checkVertical = (arr: string[], ypos: number, xpos: number): number => {
  let total = 0;
  const height = arr.length;
  if (
    ypos >= 3 &&
    arr[ypos - 1][xpos] === "M" &&
    arr[ypos - 2][xpos] === "A" &&
    arr[ypos - 3][xpos] === "S"
  ) {
    total++;
  }
  if (
    ypos <= height - 4 &&
    arr[ypos + 1][xpos] === "M" &&
    arr[ypos + 2][xpos] === "A" &&
    arr[ypos + 3][xpos] === "S"
  ) {
    total++;
  }
  return total;
};

const checkDiagonal = (arr: string[], ypos: number, xpos: number): number => {
  let total = 0;
  const width = arr[0].length;
  const height = arr.length;
  // bottom right to top left
  if (
    xpos >= 3 &&
    ypos >= 3 &&
    arr[ypos - 1][xpos - 1] === "M" &&
    arr[ypos - 2][xpos - 2] === "A" &&
    arr[ypos - 3][xpos - 3] === "S"
  ) {
    total++;
  }
  //bottom left to top right
  if (
    ypos >= 3 &&
    xpos <= width - 4 &&
    arr[ypos - 1][xpos + 1] === "M" &&
    arr[ypos - 2][xpos + 2] === "A" &&
    arr[ypos - 3][xpos + 3] === "S"
  ) {
    total++;
  }
  // top right to bottom left
  if (
    ypos <= height - 4 &&
    xpos >= 3 &&
    arr[ypos + 1][xpos - 1] === "M" &&
    arr[ypos + 2][xpos - 2] === "A" &&
    arr[ypos + 3][xpos - 3] === "S"
  ) {
    total++;
  }
  // top left to bottom right
  if (
    ypos <= height - 4 &&
    xpos <= width - 4 &&
    arr[ypos + 1][xpos + 1] === "M" &&
    arr[ypos + 2][xpos + 2] === "A" &&
    arr[ypos + 3][xpos + 3] === "S"
  ) {
    total++;
  }
  return total;
};

checkFull(text);
