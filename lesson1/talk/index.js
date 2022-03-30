const filename = "filenamee";
const hello = function() {
    console.log("Goodbye");
}

const intro = function() {
    console.log("hi hi ", filename);
}

module.exports = {
    greeting: hello,
    intro: intro
}