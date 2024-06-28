const {sign, verify} = require('jsonwebtoken');
require('dotenv').config()

const createToken = (user) => {
    const accessToken = sign({username: user.username}, process.env.JWT_SECRET)
    return accessToken
}

const validateToken = (req, res, next) => {
    if (!req.cookies) return res.status(400).json({message: 'User not authenticated'})
    
    const accessToken = req.cookies['access-token']
    
    if (!accessToken) return res.status(400).json({message: 'User not authenticated'})
    
    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET)

        if (validToken) {
            res.authenticated = true
            return next()
        }
    } catch (err) {
        return res.status(400).json({message: err})
    }
}

module.exports = {createToken, validateToken}