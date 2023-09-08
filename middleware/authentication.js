const { BadRequestError, UnauthenticatedError } = require("../errors")
const jwt = require('jsonwebtoken')

const auth = async (req, res) => {
    const header = req.headers.authorization
    if(!header || !header.startsWith('Bearer')) {
        throw new BadRequestError('not authorized')
    }
    const token = header.split(' ')[1]
    if (!token) {
        throw new BadRequestError('not authorized or no token provided')
    }

    try {
        const decoded = await jwt.verify(token, process.env.SECRET_JWT)
        res.json({decoded})
        next()
    } catch (error) {
        throw new UnauthenticatedError('invalid tokensssss')
    }
}

module.exports = auth