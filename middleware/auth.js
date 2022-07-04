const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    // allow token to be passed in get or post request as well
    const token = req.query.token || req.body.token || req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send("You shall not pass!")
    }

    try {
        req.user = jwt.verify(token, process.env.TOKEN_KEY)
    } catch(err) {
        console.log(err)
        return res.status(400).send("Token not valid")
    }
    return next()
}

module.exports = verifyToken