const fs = require("fs");

const data = fs.readFileSync("./data.text", "utf8");

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

const task1 = (reports: number[][]): number => {
  let safeReports = 0;

  reports.forEach((report) => {
    if (isSafe(report)) {
      safeReports += 1;
    }
  });

  return safeReports;
};

const safeCount = task1(splitData);
console.log(safeCount);
