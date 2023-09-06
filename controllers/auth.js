const User = require('../models/User')

const register = async (req, res) => {
    console.log(req.body)
    const newUser = await User.create({...req.body})
    res.status(200).json({ newUser})
}

const login = (req, res) => {
    res.send('login')
}

module.exports = {
    register,
    login
}