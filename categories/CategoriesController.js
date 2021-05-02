const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {

        res.render("admin/categories/new.ejs");
});

router.post("/categories/save", (req, res) => {
    var categoria = req.body.title;
    if(categoria.trim() != undefined && categoria.trim() != ""){

        Category.create({
            title: categoria,
            slug: slugify(categoria.toLowerCase()) 
        }).then(() => {
            res.redirect("/admin/categories");
        });

    }else{
        res.redirect("/admin/categories/new");
    }
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    console.log(id)
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:
                {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });

        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    }
});

router.get("/admin/categories", (req, res) => {
    Category
    .findAll()
    .then(categories =>{
        res.render("admin/categories/index", {categories: categories});
    });
});

module.exports = router;