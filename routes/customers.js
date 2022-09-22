const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// POST REQUEST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();

  res.send(customer);
});

// PUT REQUEST
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer) return res.status(404).send("The customer was not found");

  res.send(customer);
});

// GET REQUEST
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("The customer doesn't exist.");
  res.send(customer);
});

// DELETE REQUEST
router.delete("/:id", async (req, res) => {
  // Looks up if customer exists: doesn't exist - return 404 error
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("The customer was not found");

  res.send(customer);
});

module.exports = router;
