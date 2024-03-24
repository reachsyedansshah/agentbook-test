const Joi = require('joi');

const updateUserValidationSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    avatar: Joi.string().optional(),
});

module.exports = {  updateUserValidationSchema };
