require("dotenv").config()
require("./config/db").connectDB()

const auth = require("./middleware/auth")
const express = require("express")
const Movie = require("./model/movie")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use("/register", require("./routes/register"))
app.use("/login", require("./routes/login"))
app.use("/movies", auth, require("./routes/users"))

app.get('/', async (req, res) => {
    const movie = await Movie.find({}, {title: 1, rating: 1})
    res.send(movie)
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
