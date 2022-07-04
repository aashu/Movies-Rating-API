const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = require("express").Router()

router.post('/',async (req, res) => {
    try {
        const {email, password} = req.body

        //validation
        if(!(email && password)) {
            res.status(400).send("Email and password both are required")
        }

        const user = await User.findOne({email: email})

        if(user && (await bcrypt.compare(password, user.password))) {
            // generate token
            const token = jwt.sign(
                {user_id: user._id, email: email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            )
            // update user token
            user.token = token

            res.status(200).send(user)
        }
        else {
            res.status(400).send("Invalid credentials")
        }

    } catch(err) {
        console.error(err)
        res.status(400).send("something went wrong!")
    }
})

module.exports = router

