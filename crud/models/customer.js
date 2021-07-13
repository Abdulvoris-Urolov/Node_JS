const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isVip: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        required: true
    }
});
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customerJoi){
    const schema = Joi.object({
        name: Joi.string()
                 .required(),
        isVip: Joi.boolean()
                 .required(),
        phone: Joi.number()
                 .required(),
            
    });

return schema.validate(customerJoi);
}

exports.validate = validateCustomer;
exports.Customer = Customer;