import fs from "fs";
const text = fs.readFileSync("./day3.text", "utf8");

const findMatches = (data: string) => {
  const regex = /mul\([0-9]+,[0-9]+\)/g;
  const matches = data.match(regex);
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

findMatches(text);
