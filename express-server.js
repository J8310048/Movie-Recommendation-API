const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());

app.get("/search", (req, res) => {
  const query = req.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_API_TOKEN,
    },
  };

  fetch(url, options)
    .then((resp) => resp.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
});

app.get("/similar", (req, res) => {
  const movieId = req.query.movie_id;
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_API_TOKEN,
    },
  };

  fetch(url, options)
    .then((resp) => resp.json())
    .then((json) => res.send(json))
    .catch((err) => console.error("error:" + err));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
