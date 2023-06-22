const express = require("express");
const router = express.Router();
const { Validator } = require("node-input-validator");

genres = [];

router.get("/api/genres", (req, res) => {
  res.json(genres);
});

router.get("/api/genres/:id", (req, res) => {
  let gen = genres.find((c) => c.id === parseInt(req.params.id));
  if (gen === undefined) {
    res.status(404).send("genre with the given ID was not found");
    return;
  }
  res.send(gen);
});

router.post("/api/genres", (req, res) => {
  const v = new Validator(req.body, {
    genre: "required|minLength:5",
  });
  v.check().then((matched) => {
    if (!matched) {
      res.status(400).send(v.errors);
      return;
    }
    genres.push({
      id: genres.length + 1,
      genre: req.body.genre,
    });
    res.json(genres[genres.length - 1]);
  });
});

router.put("/api/genres/:id", (req, res) => {
  const v = new Validator(req.body, {
    genre: "required|minLength:5",
  });
  v.check().then((matched) => {
    if (!matched) {
      res.status(400).send(v.errors);
      return;
    }
    let gen = genres.find((c) => c.id === parseInt(req.params.id));
    if (gen === undefined) {
      res.status(404).send("genre with the given ID was not found");
      return;
    }
    gen.genre = req.body.genre;
    res.json(gen);
  });
});

router.delete("/api/genres/:id", (req, res) => {
  let gen = genres.find((c) => c.id === parseInt(req.params.id));
  if (gen === undefined) {
    res.status(404).send("genre with the given ID was not found");
    return;
  }
  let index = genres.indexOf(gen);
  genres.splice(index, 1);
  res.send(gen);
});


module.exports = router;
