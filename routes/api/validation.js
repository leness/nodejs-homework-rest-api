const Joi = require('joi');

const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
    phone: Joi.string().required(),
    isVaccinated: Joi.boolean().optional()
})

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).optional(),
    phone: Joi.number().integer().min(10**9).max(10**10 - 1).optional(),
    isVaccinated: Joi.boolean().optional(),
}).or('name', 'email', 'phone', 'isVaccinated')

const schemaUpdateStatusContact = Joi.object({
    isVaccinated: Joi.boolean().required()
})
   

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        next()
    } catch (err) {
        next({
            status: 400,
            message: err.message.replace(/"/g, ''),
        })
     }
}
    
module.exports = {
    validationCreateContact: (req, res, next) => {
        return validate(schemaCreateContact, req.body, next)
    },
    validationUpdateContact: (req, res, next) => {
        return validate(schemaUpdateContact, req.body, next)
    },
    validationUpdateStatusContact: (req, res, next) => {
        return validate(schemaUpdateStatusContact, req.body, next)
    }
}