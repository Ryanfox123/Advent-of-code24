const fs = require("fs");

const data = fs.readFileSync("./data.text", "utf8");

const testData: number[][] = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

const splitData = data
  .trim()
  .split("\n")
  .map((report: string) => report.split(" ").map(Number));

const isSafe = (report: number[]): boolean => {
  const diffs = [];

  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
    diffs.push(diff);
  }

  const allIncreasing = diffs.every((diff) => diff > 0);
  const allDecreasing = diffs.every((diff) => diff < 0);

  return allIncreasing || allDecreasing;
};

const isSafeWithDampener = (report: number[]): boolean => {
  if (isSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));

    if (isSafe(modifiedReport)) {
      return true;
    }
  }

  return false;
};

const task1 = (reports: number[][]): number => {
  let safeReports = 0;

  reports.forEach((report) => {
    if (isSafeWithDampener(report)) {
      safeReports += 1;
    }
  });

  return safeReports;
};

const safeCount = task1(splitData);
console.log(safeCount);
