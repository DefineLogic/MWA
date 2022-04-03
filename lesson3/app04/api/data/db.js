const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to ", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose okkk disconnected.");
});


mongoose.connection.on("error", function() {
    console.log("Mongoose Errorr.", err);
});

// process.on("SIGINT", function() {
//     mongoose.connection.close(function() {
//         console.log(process.env.SIGINT_MESSAGE);
//         process.exit(0);
//     })

// })

process.on("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    })

})