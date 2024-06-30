var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();

router.post('/login', async function (req, res, next) {
    let user = await db.user_data.findOne({where: {name: req.body.name}});
    if (user == null) {
        res.send('user does not exists');
        return
    }
    if (user.password !== req.body.password) {
        res.send('password or username does not match');
        return
    }
    res.send('access granted');
});

router.post('/signup', async function(req, res, next) {
    let name = await db.user_data.findOne({where: {
        name: req.body.username
        }})
    let mail = await db.user_data.findOne({where: {
            email: req.body.email
        }})
    if (name != null) {
        res.send('name already exists');
        return
    }
    if (mail != null) {
        res.send('email already used');
        return
    }
    await db.user_data.create({
        email: req.body.email,
        name: req.body.username,
        password: req.body.password,
        date_joined: Date.now()
    })
    res.send('account created successfully');
});
module.exports = router;
