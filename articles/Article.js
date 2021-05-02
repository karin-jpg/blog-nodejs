const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("./../categories/Category");


const Article = connection.define("articles", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING(5000),
        allowNull: false
    }
});

Article.belongsTo(Category);
Article.sync({force: false});


module.exports = Article;