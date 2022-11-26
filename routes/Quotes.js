const { Router } = require("express");
const express = require("express");
const router = express.Router();
const quote = require("../models/Quotes");

// get all quote
router.get("/", async (req, res) => {
  const quotes = await quote.find();

  res.send(quotes);
});

//create new quote

router.post("/new", async (req, res) => {
  const newQuote = new quote(req.body);

  const savedQuote = await newQuote.save();

  res.json(savedQuote);
});

//get specific quote

router.get("/get/:id", async (req, res) => {
  const q = await quote.findById({ _id: req.params.id });
  res.json(q);
});

//delete a quote

router.delete("/delete/:id", async (req, res) => {
  // console.log("first")

  const result = await quote.findByIdAndDelete({ _id: req.params.id });
  res.json(result);
});

//update a quote
router.patch("/update/:id", async (req, res) => {
  const upResult = await quote.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(upResult);
});

//GETTING RANDOM QUOTES

router.get("/random", async (req, res) => {
  const count = await quote.countDocuments();
  const random = Math.floor(Math.random()*count);
  const q = await quote.findOne().skip(random);
  res.json(q);
});

module.exports = router;
