const router = require("express").Router()
const {getfullMovieDetails, rateMovie} = require("../controllers/moviesController")

router.get('/', getfullMovieDetails)

router.post('/rate', rateMovie)

module.exports = router