const User = require('../models/User')
const { BadRequestError } = require('../errors')
const { StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const newUser = await User.create(req.body)
    res.status(StatusCodes.CREATED).json({ newUser})
}

const login = (req, res) => {
    res.send('login')
}

module.exports = {
    register,
    login
}