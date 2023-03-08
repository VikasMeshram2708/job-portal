const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(10).required(),
});

module.exports = userSchema;