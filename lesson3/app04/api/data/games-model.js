const mongoose = require("mongoose")

const publisher = mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String },
    established: { type: Number },
    location: { type: [Number], index: "2dsphere" } //longitude(E/W), latitude(N/S)
})
const GameSchema = mongoose.Schema({
    title: { type: String, required: true },
    year: Number,
    rate: { type: Number, min: 1, max: 5, default: 1 },
    price: Number,
    minPlayers: { type: Number, min: 1, max: 10 },
    maxPlayers: { type: Number, min: 1, max: 10 },
    minAge: Number,
    publisher: publisher,
    designers: [String]
});

mongoose.model(process.env.GAME_MODEL, GameSchema, process.env.GAME_COLLECTION);