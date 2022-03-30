const fs = require("fs");

console.log("1: Start App");

// const buffer = fs.readFileSync("largeFile.txt");
const printFirstLine = function(err, buffer) {
    console.log(buffer.toString());
}

fs.readFile("largeFile.txt", printFirstLine);
// console.log("Got the file:", buffer.toString());
console.log("3: End App");