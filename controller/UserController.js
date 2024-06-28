const User = require('../model/User')
const bcrypt = require('bcrypt')
const {createToken} = require('../utils/JWT')
const { use } = require('../routes/NewFeed')

const userLogin = async (req, res) => {
    const { username, password } = req.body
    let user
    try {
        user = await User.findOne({ username: username }).exec()
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    }
    if (user == null) {
        return res.status(404).json({ message: 'User not found' })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = createToken(user)
        res.cookie('access-token', token, {
            maxAge: 2592000000,
            httpOnly: true
            })
        res.cookie('userId', user._id, {
            maxAge: 2592000000,
            httpOnly: true
            })
        res.status(200).json({ message: 'Login success' })
    } else {
        res.status(401).json({ message: 'Login failed' })
    }
}

const userRegister = async (req, res) => {
    const { username, password } = req.body
    let user
    try {
        user = await User.findOne({ username: username }).exec()
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' })
    } 
    if (user != null) {
        return res.status(400).json({ message: 'User already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        username,
        password: hashedPassword
    })
    res.status(201).json({ message: 'User created', user: newUser })
}

const userLogout = async (req, res) => {
    res.clearCookie('access-token')
    res.clearCookie('userId')
    res.status(200).json({ message: 'Logout success' })
}

module.exports = {
    userLogin,
    userRegister,
    userLogout
}