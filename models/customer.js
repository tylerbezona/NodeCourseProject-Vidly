const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 5,
      maxlength: 50,
      required: true,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      minlength: 12,
      maxlength: 12,
      required: true,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(12).max(12).required(),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
