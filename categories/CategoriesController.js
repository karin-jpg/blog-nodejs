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
            res.redirect("/")
        });

    }else{
        res.redirect("/admin/caregories/new");
    }
});

router.get("/admin/categories", (req, res) => {
        res.render("admin/categories/index");
})

module.exports = router;