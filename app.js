const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

//DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://adharsh:148118198@cluster0.cnkuq0n.mongodb.net/test"
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database Connected");
});

//MIDDLEWARE

app.use(bodyParser.json());

//ROUTES

app.get("/", (req, res) => {
  res.send("Hello World...");
});

const userQuotes = require("./routes/Quotes");

app.use("/quotes", userQuotes);

app.listen(5000, console.log("server started"));
