const Joi = require('joi')

const schema = Joi.object({
	password: Joi.string()
		.required(),

	email: Joi.string()
		.required(),
})
	.with('password', 'email');

module.exports = schema;