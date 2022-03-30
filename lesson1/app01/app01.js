require("./talk2");

const a = require("../talk");
const question = require("../talk/question");
a.greeting();
a.intro();


const answer = question.ask("What is the meaning of life?");
console.log(answer);