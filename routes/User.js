const express = require('express')
const router = express.Router()
const controller = require('../controller/UserController')
const {validateToken} = require('../utils/JWT')

router.post('/login', controller.userLogin)
router.post('/register', controller.userRegister)
router.post('/logout', validateToken, controller.userLogout)

module.exports = router