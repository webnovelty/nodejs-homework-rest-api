const express = require('express')


const ctrl = require('../../controllers/users/')

const { authenticate, upload } = require('../../middlewares')

const router = express.Router()

router.post('/signup', ctrl.add)
router.post('/login', ctrl.login)
router.get('/current', authenticate, ctrl.getCurrent)
router.post('/logout', authenticate, ctrl.logout)
router.post('/avatars', authenticate, upload.single("avatar"), ctrl.textFile)

module.exports = router
