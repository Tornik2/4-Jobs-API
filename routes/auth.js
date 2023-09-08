const express = require('express')
const { register, login } = require('../controllers/auth')
const auth = require('../middleware/authentication')
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login).get(auth)

module.exports = router