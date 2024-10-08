var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();
let crypto = require("crypto");
let jwt = require("jsonwebtoken");
require('dotenv').config();


router.post('/login', async function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.json({
            result : 3,
            detail : 'username or password is empty',
        });
        return
    }

    let user = await db.user_data.findOne({where: {name: req.body.username}});
    if (user == null) {
        res.json({
            result : 1,
            detail : 'account not found'
        });
        return
    }
    if (user.password !== crypto.createHash('sha512').update(req.body.password + user.salt).digest('hex')) {
        res.json({
            result : 2,
            detail : 'incorrect password or username'
        });
        return
    }
    let token = jwt.sign({
        id: user.user_id,
        username: user.name
    }, process.env.JWT_SECRET, {expiresIn: 7*24*60*60});
    res.json({
        token : token,
        result : 0,
        detail : 'access granted'
    });
});

router.post('/signup', async function(req, res, next) {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.json({
            result : 3,
            detail : 'username/password/email is empty'
        })
        return
    }
    let name = await db.user_data.findOne({where: {
        name: req.body.username
        }})
    let mail = await db.user_data.findOne({where: {
            email: req.body.email
        }})
    if (name != null) {
        res.json({
            result : 2,
            detail : 'user already exists'
        });
        return
    }
    if (mail != null) {
        res.json({
            result : 1,
            detail : 'mail already used'
        });
        return
    }
    let salt = crypto.randomBytes(32).toString('hex')
    console.log(salt)
    let passwordHash = crypto.createHash('sha512').update(req.body.password + salt).digest('hex')
    await db.user_data.create({
        email: req.body.email,
        name: req.body.username,
        password: passwordHash,
        salt: salt,
        date_joined: Date.now()
    })
    let user = await db.user_data.findOne({where: {email: req.body.email}});
    let token = jwt.sign({
        id: user.user_id,
        username: user.name
    }, process.env.JWT_SECRET, {expiresIn: 7*24*60*60});
    res.json({
        token: token,
        result: 0,
        detail: 'access granted'
    })
});
module.exports = router;
