const { Rental, validate } = require("../models/rental");
const Customer = require("../models/customer");
const Movie = require("../models/movie");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  // - sign next to "dateOut" to indicate the list in decending order
  const rental = await Rental.find().sort("-dateOut");
  res.send(rental);
});

// POST REQUEST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie no longer in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

// PUT REQUEST
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!rental) return res.status(404).send("The rental was not found");

  res.send(rental);
});

// GET REQUEST
router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send("The rental doesn't exist.");
  res.send(rental);
});

// DELETE REQUEST
router.delete("/:id", async (req, res) => {
  // Looks up if rental exists: doesn't exist - return 404 error
  const rental = await Rental.findByIdAndRemove(req.params.id);

  if (!rental) return res.status(404).send("The rental was not found");

  res.send(rental);
});

module.exports = router;
