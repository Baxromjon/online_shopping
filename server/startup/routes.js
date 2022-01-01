const express = require('express');
const country = require('../routes/country');
const region = require('../routes/region')
const district = require('../routes/district')
const address = require('../routes/address')
const category = require('../routes/category')
const measurement = require('../routes/measurement')
const currencyType = require('../routes/currencyType')
const payType = require('../routes/payType')
const product = require('../routes/product')
const detail = require('../routes/detail')
const values = require('../routes/value')
const user = require('../routes/user')
const auth = require('../routes/auth')
const bodyParser=require('body-parser')
const criteria=require('../routes/criteria')
const rates=require('../routes/rate')


module.exports = function (app) {
    app.use(express.json());
    app.use('/uploads', express.static('uploads'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/api/countries', country);
    app.use('/api/regions', region);
    app.use('/api/districts', district);
    app.use('/api/address', address);
    app.use('/api/categories', category);
    app.use('/api/measurements', measurement);
    app.use('/api/currencyTypes', currencyType);
    app.use('/api/payTypes', payType);
    app.use('/api/products', product);
    app.use('/api/details', detail);
    app.use('/api/values', values);
    app.use('/api/users', user);
    app.use('/api/auth', auth);
    app.use('/api/criterias', criteria)
    app.use('/api/rates', rates)

    // app.use(function(req, res, next) {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //     // allow preflight
    //     if (req.method === 'OPTIONS') {
    //         res.send(200);
    //     } else {
    //         next();
    //     }
    // });
}