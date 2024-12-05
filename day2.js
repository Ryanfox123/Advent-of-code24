"use strict";
const fs = require("fs");
// Read the data from the file
const data = fs.readFileSync("./data.text", "utf8");
// Parse the input data
const splitData = data
    .trim()
    .split("\n")
    .map((report) => report.split(" ").map(Number));
// Function to check if a report is safe
const isSafe = (report) => {
    const diffs = [];
    for (let i = 0; i < report.length - 1; i++) {
        const diff = report[i + 1] - report[i];
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false; // Difference is not within [1, 3]
        }
        diffs.push(diff);
    }
    // Check if all differences are either positive (increasing) or negative (decreasing)
    const allIncreasing = diffs.every((diff) => diff > 0);
    const allDecreasing = diffs.every((diff) => diff < 0);
    return allIncreasing || allDecreasing;
};
// Main function to analyze reports
const task1 = (reports) => {
    let safeReports = 0;
    reports.forEach((report) => {
        if (isSafe(report)) {
            safeReports += 1;
        }
    });
    return safeReports;
};
// Run the task and output the result
const safeCount = task1(splitData);
console.log("Number of safe reports:", safeCount);
