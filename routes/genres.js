const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// POST REQUEST
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

// GET REQUEST
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send("The genre you're looking for was not found in the database.");
  res.send(genre);
});

// PUT REQUEST
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre) return res.status(404).send("The genre was not found");

  res.send(genre);
});

// DELETE REQUEST
router.delete("/:id", async (req, res) => {
  // Looks up if genre exists: doesn't exist - return 404 error
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("The genre was not found");

  res.send(genre);
});

module.exports = router;
