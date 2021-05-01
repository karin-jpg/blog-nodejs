const bodyParser = require("body-parser");
const express = require("express")
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extends: false}));
app.use(express.json());

app.get("/", (req, res) => {

    res.render("index.ejs");

})

app.listen(3000, () => {
    console.log("servidor ta on");
})