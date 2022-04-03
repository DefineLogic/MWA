const mongoose = require("mongoose")

const production = mongoose.Schema({
    productionTitle: {type: String},
    location: {type: String}
})


const SitcomSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        aired: {type: String, required: true},
        imdbRating: {type: Number, min: 1, max: 10},
        totalSeasons: {type: Number},
        totalEpisodes: {type: Number},
        production: production
    }
)

mongoose.model(process.env.SITCOM_MODEL,SitcomSchema, process.env.SITCOM_COLLECTION);