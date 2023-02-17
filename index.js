const { response } = require("express");
const express = require("express");
const path = require("path");

const library = require("./components/library/library");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// from function collect all the data from loadname and save as library for pug
app.get("/", async (request, response) => {
  let data = await library.loadName();
  response.render("index", { title: "index", library: data });
});
//call loadname function to have only value which is clicked link id
// select all the data
// find id
// create a loop where input id from url is match to and id in object give that object
app.get("/:id", async (request, response) => {
  let data = await library.loadName();
  const id = request.params.id
  let singleLibrary = data[0];
  console.log(request.params.id)
  for (const entry of data.entries()) {
    // console.log(entry[1].id);
    if (entry[1].id === id) {
      singleLibrary = entry[1]
      break;
    }
  }
  response.render("index", { library: [singleLibrary] });

});
// server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});