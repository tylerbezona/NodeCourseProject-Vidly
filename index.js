const mongoose = require("mongoose");
const customers = require("./routes/customers");
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

// PORT
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// HOME
app.get("/", (req, res) => {
  res.send("Hello World!");
});
