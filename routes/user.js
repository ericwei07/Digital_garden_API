var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();

router.get('/profile', async function(req, res, next) {
    if (!req.query.id) {
        res.json({
            result : 1,
            detail : 'id can not be empty'
        });
        return
    }

    let user = await db.user_data.findOne({where: {user_id: req.query.id}});

    if (!user) {
        res.json({
            result : 1,
            detail : 'account not found'
        });
        return
    }

    let timestamp = new Date(user.date_joined)
    let year = timestamp.getFullYear() + "/"
    let month =  timestamp.getMonth() + 1 + "/"
    let day = timestamp.getDate()
    let hour = timestamp.getHours() + ":"
    let minute = timestamp.getMinutes() + ":"
    let second = timestamp.getSeconds()
    let time = year
    if (month.length < 3) month = "0" + month
    if (day.length < 2) day = "0" + day
    if (hour.length < 3) hour = "0" + hour
    if (minute.length < 3) minute = "0" + minute
    if (second.length < 2) second = "0" + second
    time += month + day + " " + hour + minute + second

    let result = {
        id: user.user_id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_picture,
        join_date : time
    }
    res.json(result);
});

module.exports = router;
