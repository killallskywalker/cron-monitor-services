const Joi = require('joi');

exports.create = {
  body: Joi.object().keys({
    projectName: Joi.string().required(),
  }),
};
