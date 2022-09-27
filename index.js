const mongoose = require("mongoose");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const movies = require("./routes/movies");
const express = require("express");
const genres = require("./routes/genres");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to Vidly database..."))
  .catch((err) => console.log("Unable to reach database", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

// PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// HOME
app.get("/", (req, res) => {
  res.send("Hello World!");
});
