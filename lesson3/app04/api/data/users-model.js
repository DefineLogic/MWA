const mongoose = require("mongoose")

const UsersSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 3 }
});

mongoose.model(process.env.USER_MODEL, UsersSchema, process.env.USER_COLLECTION);