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
        const indexx = movie.rated_by.findIndex((person) => person.user_id == req.user.user_id)
        
        current_rating = movie.rating
        current_count = movie.rating_count
        let result = (current_rating*current_count) + rating
        if(indexx != -1) {
            // user already had rated before, so decrement previous rating
            result -= Number(movie.rated_by[indexx]['rating'])
            // update rating by current user
            movie.rated_by[indexx]['rating'] = rating
        } else {
            // this user is rating for first time
            movie.rated_by.push({user_id: req.user.user_id, rating: rating})
            current_count += 1
        }
        
        let new_rating = result/ current_count
        movie.rating = new_rating
        movie.rating_count = current_count
        await movie.save()
        res.send(movie)
    } catch(err) {
        console.error(err)
    }

})

module.exports = router