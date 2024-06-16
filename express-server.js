require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); //this is the middleware/middleman

app.get("/", (req, res) => {
  const url =
    "https://api.themoviedb.org/3/search/movie?query=Batman&include_adult=false&language=en-US&page=1";
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
  //   res.send({ id: "Joshua" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
