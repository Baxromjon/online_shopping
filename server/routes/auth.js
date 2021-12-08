const express = require('express')
const router = express.Router()
const { User } = require('../models/users')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const Joi = require('joi')

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ phoneNumber: req.body.phoneNumber })
    if (!user)
        return res.status(400).send('Phone number or password error')

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword)
        return res.status(400).send('Phone number or password error')

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send('Successfully');

})

function validate(req) {
    const userSchema = {
        phoneNumber: Joi.string().required().length(13),
        password: Joi.string().required().min(6).max(15)
    }
    return Joi.validate(req, userSchema)
};

module.exports = router;