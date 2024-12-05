import fs from "fs";
const text = fs.readFileSync("./day3.text", "utf8");

const testText =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const findMatches = (data: string) => {
  const regex = /mul\([0-9]+,[0-9]+\)/g;
  const matches = data.match(regex);
  let total = 0;
  matches?.forEach((mul) => {
    const numMatches = mul.match(/[0-9]+/g);
    if (numMatches?.length) {
      total += +numMatches[0] * +numMatches[1];
    }
  });
  console.log(total);
};

findMatches(text);

const findMatchesWhenTold = (data: string) => {
  const splitData = data.split("do()");
  const allowedMemory = [];
  for (let i = 0; i < splitData.length; i++) {
    allowedMemory.push(splitData[i].split("don't()")[0]);
  }
  const regex = /mul\([0-9]+,[0-9]+\)/g;
  const matches = allowedMemory.join("").match(regex);
  let total = 0;
  matches?.forEach((mul) => {
    const numRegex = /[0-9]+/g;
    const numMatches = mul.match(numRegex);
    if (numMatches?.length) {
      total += +numMatches[0] * +numMatches[1];
    }
  });
  console.log(total);
};

findMatchesWhenTold(text);
