const express = require('express')

const ctrl = require('../../controllers/users/')

const {authenticate} = require('../../middlewares')

const router = express.Router()

router.post('/signup', ctrl.add)
router.post('/login', ctrl.login)
router.get('/current', authenticate, ctrl.getCurrent)
router.post('/logout', authenticate, ctrl.logout)

module.exports = router
