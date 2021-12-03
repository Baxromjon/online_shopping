const Joi=require('joi')
const mongoose=require('mongoose');

const countrySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:55,
        unique:true
    }
});

const Country=mongoose.model('Country', countrySchema);

function validateCountry(country){
    const countrySchema={
        name:Joi.string().required().min(3).max(55)
    }
    return Joi.validate(country, countrySchema);
}

exports.Country=Country;
exports.countrySchema=countrySchema;
exports.validateCountry=validateCountry;