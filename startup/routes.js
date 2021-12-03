const express=require('express');
const country=require('../routes/country');
const region=require('../routes/region')


module.exports=function(app){
    app.use(express.json());
    app.use('/api/countries', country);
    app.use('/api/regions', region);
}