const Joi = require('joi');

exports.create = {
  body: Joi.object().keys({
    projectId: Joi.string().required(),
    jobName: Joi.string().required(),
    frequency: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

