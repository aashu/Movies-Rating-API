const router = require("express").Router()
const auth = require("../controllers/authController")

router.post('/', auth.register)

module.exports = router