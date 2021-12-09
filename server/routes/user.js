const express = require('express')
const router = express.Router()
const { User, validateUser, Role } = require('../models/users')
const { District } = require('../models/district')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    return res.send(user)
})

router.get('/', async (req, res) => {
    const users = await User.find().sort('firstName')
    res.send(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).send('User not found by given Id')

    res.send(user)
})

router.post('/auth/register', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const district = await District.findById(req.body.districtId)
    if (!district)
        return res.status(400).send('District not found by given district Id')
    let user = await User.findOne({ phoneNumber: req.body.phoneNumber })
    if (user)
        return res.status(400).send('User allready exists by this phone number')
    const salt = await bcrypt.genSalt();
    // user = new User(_.pick(req.body, ['firstName', 'lastName', 'phoneNumber', 'password',
    //     district._id, 'street', 'home', Role.CLIENT]))
    // user.password = await bcrypt.hash(user.password, salt)

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: await bcrypt.hash(req.body.password, salt),
        district: { _id: district._id },
        street: req.body.street,
        home: req.body.home,
        role: Role.CLIENT
    })
    user = await user.save()
    res.send('Successfully added')
})

router.put('/:id', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)
    const district = await District.findById(req.body.districtId)
    if (!district)
        return res.status(400).send('District not found by given district Id')
    let user = await User.findOne({ phoneNumber: req.body.phoneNumber })
    if (user)
        return res.status(400).send('User allready exists by this phone number')
    user = await User.findById(req.params.id)
    if (!user)
        return res.status(400).send('User not found by given id')
    const salt = await bcrypt.genSalt();
    user = await User.findOneAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        password: await bcrypt.hash(req.body.password, salt),
        district: { _id: district._id },
        street: req.body.street,
        home: req.body.home,
        role: Role.CLIENT
    }, { new: true })
    if (!user)
        return res.status(400).send('User not found by given userId')

    res.send('Successfully edited')
})

router.delete('/:id', async (req, res) => {
    const users = await User.findByIdAndRemove(req.params.id)
    if (!users)
        return res.status(400).send('User not found by given id')

    res.send('Successfully deleted')
})

module.exports = router;