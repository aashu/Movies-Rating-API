const router = require("express").Router()
const auth = require("../controllers/authController")

router.post('/', auth.login)

module.exports = router

