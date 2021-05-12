const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");


router.get("/login", (req, res) =>{

    res.render("admin/users/login");
});

router.post("/authenticate", (req, res)=>{
    var name = req.body.name;
    var password = req.body.password;


    User.findOne({
        where: {
            name: name
        }
    }).then((user) =>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);

            if(correct){
                req.session.user = {
                    id: user.id,
                    name: user.name
                }
                res.redirect("/admin/users");
            }else{
                res.redirect("/login");    
            }
        }else{
            res.redirect("/login");
        }
    })
});

router.get("/admin/users", adminAuth, (req, res) =>{
    User.findAll().then((users) => {
        res.render("admin/users/index", {users: users});
    });
});


router.get("/admin/users/create", adminAuth, (req, res) => {
    res.render("admin/users/create");
});


router.post("/users/create", adminAuth, (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then((user) => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/admin/users");
            }).catch((erro) =>{
                //res.redirect("/");
                res.json(erro);
            });

        }else{
            res.redirect("/admin/users/create");
        }
    })
});


router.post("/users/update", adminAuth, (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    
    if(isNaN(id)){
        res.redirect("/admin/users/index");
    }else{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        User.update({name:name,email:email,password:hash}, {
            where: {
                id: id
            }
        })
        .then(() => {
            res.redirect("/admin/users");
        }).catch((erro) => {
            res.redirect("/");
        })
    }

});

router.post("/users/delete", adminAuth, (req, res) => {
    var id = req.body.id;

    if(id != undefined){
        if(!isNaN(id)){
            User.destroy({
                where:
                {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/users");
            });

        }else{
            res.redirect("/admin/users");
        }
    }else{
        res.redirect("/admin/users");
    }
});


router.get("/admin/users/edit/:id", adminAuth, (req, res) =>{
    var id = req.params.id;

    if(id == undefined || isNaN(id)){
        res.redirect("admin/users/index");
    }else{
        User.findByPk(id).then((user) =>{
            res.render("admin/users/edit", {user:user});
        });
    }
});

module.exports = router;