const express=require('express');
const country=require('../routes/country');
const region=require('../routes/region')
const district=require('../routes/district')


module.exports=function(app){
    app.use(express.json());
    app.use('/api/countries', country);
    app.use('/api/regions', region);
    app.use('/api/districts', district)
}