const Joi = require("joi");

exports.CampgroundSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required().min(0),
      location:Joi.string().required(),
      description:Joi.string().required(),
      image:Joi.string().required()
    }).required(),
  });