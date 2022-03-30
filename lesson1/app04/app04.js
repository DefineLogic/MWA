const fs = require("fs");

console.log("1: Start App");

const buffer = fs.readFileSync("largeFile.txt");
console.log("Got the file:", buffer.toString());
console.log("3: End App");