const express = require("express")
const app = express();
const connection = require("./database/database.js");
const session = require("express-session");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

app.set('view engine', 'ejs');


app.use(session({
    secret: "evangelion",
    cookie: {
        maxAge: 30000
    },
    resave: true,
    saveUninitialized: true
}));

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
app.use("/", usersController);


app.get("/session", (req, res)=>{
    req.session.user = {
        nome: "karin",
        idade: 21
    }
    res.send("sessao gerada");
});

app.get("/reading", (req, res)=>{
    res.json(req.session.user)
});


app.get("/", (req, res) => {

    Article
    .findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    })
    .then((articles) => {

        Category.findAll()
        .then((categories) => {
            res.render("index", {articles: articles, categories:categories});
        });
        
    });
    
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    })
    .then((article) => {
        if(article != undefined){
            Category.findAll()
        .then((categories) => {
            res.render("article", {article: article, categories:categories});
        });
        }else{
            res.redirect("/");
        }
    })
    .catch((error) => {
        res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findAll({
        include: [{
            model: Category,
            where: {
                slug: slug
            }
        }]
    }).then((articles) => {
        if(articles != undefined){
            Category.findAll().then((categories) => {
                res.render("index", {articles: articles, categories: categories});
            })
        }else{
            res.redirect("/")
        }
    }).catch((error) => {
        res.redirect("/")
    })
});

app.listen(8080, () => {
    console.log("servidor ta on");
});