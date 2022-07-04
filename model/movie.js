const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    overview: {type: String, required: true},
    lang: {type: String, default: "en"},
    rating: {type: Number, default: 0},
    rating_count: {type: Number, default: 0}, // required for updating rating later on
})

module.exports = mongoose.model("Movie", movieSchema)