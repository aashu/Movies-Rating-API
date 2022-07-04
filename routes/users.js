const router = require("express").Router()
const Movie = require("../model/movie")

router.get('/', async (req, res) => {
    const movies = await Movie.find()
    res.status(200).send(movies)
})

router.post('/rate', async(req, res) => {
    let {rating, id} = req.body
    rating = Number(rating)
    if(rating < 0 || rating > 5) return res.status(400).send("rating should be between 0 and 5")
    try {
        const movie = await Movie.findById(id)
        let current_rating = movie.rating
        let current_count = movie.rating_count
        let result = (current_rating*current_count) + rating
        let new_rating = result/ (current_count+1)
        movie.rating = new_rating
        movie.rating_count = current_count + 1
        await movie.save()
        res.send(movie)
    } catch(err) {
        console.error(err)
    }

})

module.exports = router