"use strict";
const fs = require("fs");
// Read data from the file
const data = fs.readFileSync("./data.text", "utf8");
// Test data for example
const testData = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
];
// Parse the data
const splitData = data
    .trim()
    .split("\n")
    .map((report) => report.split(" ").map(Number));
// Function to check if a report is safe
const isSafe = (report) => {
    const diffs = [];
    // Loop through the report and calculate differences between adjacent levels
    for (let i = 0; i < report.length - 1; i++) {
        const diff = report[i + 1] - report[i];
        // Check if the difference is outside the allowed range [1, 3]
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }
        diffs.push(diff);
    }
    // Check if all differences are either positive (ascending) or negative (descending)
    const allIncreasing = diffs.every((diff) => diff > 0);
    const allDecreasing = diffs.every((diff) => diff < 0);
    // The report is safe if it's either all increasing or all decreasing
    return allIncreasing || allDecreasing;
};
// Function to check if a report is safe with the Problem Dampener
const isSafeWithDampener = (report) => {
    // First, check if the report is safe without modification
    if (isSafe(report)) {
        return true;
    }
    // If the report is unsafe, try removing one level and check again
    for (let i = 0; i < report.length; i++) {
        // Create a new report by removing the level at index i
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
        // Check if the modified report is safe
        if (isSafe(modifiedReport)) {
            return true;
        }
    }
    // If no valid modification is found, the report is unsafe
    return false;
};
// Main function to analyze the reports
const task1 = (reports) => {
    let safeReports = 0;
    reports.forEach((report) => {
        if (isSafeWithDampener(report)) {
            safeReports += 1;
        }
    });
    return safeReports;
};
// Run the task and output the result
const safeCount = task1(splitData);
console.log(safeCount); // Outputs the number of safe reports
