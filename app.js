const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Kupi hrano", "Skuhaj hrano", "Pojej hrano"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("sl", options);
  res.render("list", { listTitle: day, newItemOnList: items });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newItemOnList: workItems });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});

app.post("/work", function (req, res) {});

app.listen(3000, function () {
  console.log("Application is running on port 3000");
});
