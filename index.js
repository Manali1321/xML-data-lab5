const express = require("express");
const { request } = require("http");
const path = require("path");

const library = require("./components/library/library");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// set up static path(for use with css, client side JS)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  let data = await library.loadName();
  response.render("index", { title: "index", library: data });
});

// server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});