const express = require("express");
const genresApi = require("./api/genres");
const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(genresApi);

app.listen(3000, () => {
  console.log("Server is up ...");
});
