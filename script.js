require("./config/db").connectDB()
require("dotenv").config()
const axios = require("axios")

const Movie = require("./model/movie")

const api_key = process.env.TMDB_API_KEY
const base_url = "https://api.themoviedb.org/3"

async function fillMovieData() {
    await new Promise(resolve => setTimeout(resolve, 10000)); // wait 10 seconds for db to be connected
    const response = await axios.get(`${base_url}/discover/movie`,{ params: {api_key: api_key,page: 10}})
    const movies = response.data.results
    for(const element of movies) {
        const {original_title, original_language, overview} = element
        const movie = await Movie.create({
            title: original_title,
            overview: overview,
            lang: original_language,
        })
    }
    console.log('done')
    process.exit(0)
}

fillMovieData()

