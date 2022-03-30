const child_process = require("child_process");

console.log("APp start");
const newProcess = child_process.spawn("node", ["fibonacci.js"], { stdio: "inherit" });
// require("./fibonacci");
console.log("APp end");