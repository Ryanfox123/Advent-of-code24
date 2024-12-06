"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const text = fs_1.default.readFileSync("./day3.text", "utf8");
const testText = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
const findMatches = (data) => {
    const regex = /mul\([0-9]+,[0-9]+\)/g;
    const matches = data.match(regex);
    let total = 0;
    matches === null || matches === void 0 ? void 0 : matches.forEach((mul) => {
        const numMatches = mul.match(/[0-9]+/g);
        if (numMatches === null || numMatches === void 0 ? void 0 : numMatches.length) {
            total += +numMatches[0] * +numMatches[1];
        }
    });
    console.log(total);
};
findMatches(text);
const findMatchesWhenTold = (data) => {
    const splitData = data.split("do()");
    const allowedMemory = [];
    for (let i = 0; i < splitData.length; i++) {
        allowedMemory.push(splitData[i].split("don't()")[0]);
    }
    const regex = /mul\([0-9]+,[0-9]+\)/g;
    const matches = allowedMemory.join("").match(regex);
    let total = 0;
    matches === null || matches === void 0 ? void 0 : matches.forEach((mul) => {
        const numRegex = /[0-9]+/g;
        const numMatches = mul.match(numRegex);
        if (numMatches === null || numMatches === void 0 ? void 0 : numMatches.length) {
            total += +numMatches[0] * +numMatches[1];
        }
    });
    console.log(total);
};
findMatchesWhenTold(text);
