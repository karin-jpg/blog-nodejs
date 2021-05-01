const express = require("express")
const app = express();
const connection = require("./database/database.js");


const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


connection
    .authenticate()
    .then(() => {
        console.log("Conexao com o banco foi de dale");
    })
    .catch((error) => {
        console.log(error);
    });


app.use("/categories", categoriesController);
app.use("/articles", articlesController);

app.get("/", (req, res) => {

    res.render("index.ejs");
})

app.listen(8080, () => {
    console.log("servidor ta on");
})