const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post('/', async (req, res) => {
    try {
        // get user input
        const {first_name, last_name, email, password} = req.body

        //validation
        if(!(email && password)) {
            res.status(400).send("All Inputs are required!")
        }

        // if user already exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            // TODO: update status codes later
            return res.status(400).send("user already exists!")
        }

        // encrypt user password
        encryptedPass = await bcrypt.hash(password, 10)
        
        // create user in db
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPass,
        })

        // generate token
        const token = jwt.sign(
            { user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        )

        user.token = token

        // return new user
        res.status(200).send("Account creation successful!")
    } catch (err) {
        console.error(err)
    }
})

module.exports = router