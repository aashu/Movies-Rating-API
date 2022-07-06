require("dotenv").config()
require("./config/db").connectDB()

const auth = require("./middleware/auth")
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use("/register", require("./routes/register"))
app.use("/login", require("./routes/login"))
app.use("/movies", auth, require("./routes/movies"))

app.get('/', require("./controllers/moviesController").getNameNRating)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
