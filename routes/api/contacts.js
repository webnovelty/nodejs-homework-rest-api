const express = require('express')

const ctrl = require('../../controllers/contacts/')

const {authenticate} = require('../../middlewares/')

const router = express.Router()

router.get('/', authenticate, ctrl.getAll)

router.get('/:contactId', authenticate, ctrl.getById)

router.post('/', authenticate, ctrl.add)

router.delete('/:contactId', authenticate, ctrl.del)

router.put('/:contactId', authenticate, ctrl.put)

router.put('/:contactId/favorite', authenticate, ctrl.favorite)

module.exports = router
