const fs = require("fs");

console.log("1: Start App");

const buffer = fs.readFileSync("largeFile.txt", (error, data) => {
    console.log(data.toString());
});
// console.log("Got the file:", buffer.toString());
console.log("3: End App");