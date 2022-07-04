require('dotenv').config()
const mongoose = require('mongoose')

connectDB = () => {
    mongoose
        .connect(process.env.MONGO_CONNECTION_URL)
        .then(() => {
            console.log("connected to DB")
        })
        .catch((err) => {
            console.log("couldn't connect to DB");
            console.error(err);
        })
}

module.exports = { connectDB }