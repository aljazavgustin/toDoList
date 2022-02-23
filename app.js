const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Kupi hrano","Skuhaj hrano","Pojej hrano"];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("sl", options);
    res.render("list", {dayOfWeek:day, newItemOnList:items});
});

app.post("/", function (req, res) {
    items.push(req.body.newItem);
    res.redirect("/");
})

app.listen(3000, function () {
  console.log("Application is running on port 3000");
});
