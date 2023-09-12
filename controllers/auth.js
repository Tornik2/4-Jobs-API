const User = require('../models/User')
const { StatusCodes} = require('http-status-codes')
const { UnauthenticatedError, BadRequestError } = require('../errors')

const register = async (req, res) => {
    const newUser = await User.create({...req.body})
    const token =  newUser.getToken()
    res.status(StatusCodes.CREATED).json({newUser, token})
}

const login = async (req, res) => {   
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('please provide email and password')
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.checkPasswords(password)
    if (isPasswordCorrect === false) {
        throw new UnauthenticatedError('Invalid Credentials, but becaouse of password')
    }
    
    const token =  user.getToken()
    res.status(StatusCodes.OK).json({ user: {name: user.name}, token })
}

module.exports = {
    register,
    login
}