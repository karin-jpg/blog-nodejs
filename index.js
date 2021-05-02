const express = require("express")
const app = express();
const connection = require("./database/database.js");


const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false, limit: '100mb'} ));
app.use(express.json({limit: '100mb'}));


connection
    .authenticate()
    .then(() => {
        console.log("Conexao com o banco foi de dale");
    })
    .catch((error) => {
        console.log(error);
    });


app.use("/", categoriesController);
app.use("/", articlesController);

app.get("/", (req, res) => {

    Article
    .findAll()
    .then((articles) => {
        res.render("index", {articles: articles});
    });
    
});

app.listen(8080, () => {
    console.log("servidor ta on");
});