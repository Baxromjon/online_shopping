const express = require('express')
const router = express.Router()
const { User, validateUser } = require('../models/users')
const { Address } = require('../models/address')

router.get('/', async (req, res) => {
    const users = await User.find().sort('firstName')
    res.send(users)
})

module.exports = router;