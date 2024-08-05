var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();

router.post('/add', async function (req, res, next) {
    if (!req.body.username || !req.body.id) {
        res.json({
            result : 1,
            detail : 'user id is empty',
        });
        return
    }
    let user = await db.user_data.findOne({
        where: {
            name: req.body.username
        }
    });
    if (!user) {
        res.json({
            result : 3,
            detail : 'user does not exist',
        });
        return
    }
    let link = await db.user_links.findOne({
        where: {
            user_id: req.body.id,
            linked_user_id: user.user_id,
        }
    });
    if (link) {
        res.json({
            result : 2,
            detail : 'link already exists'
        })
        return
    }
    await db.user_links.create({
        user_id: req.body.id,
        linked_user_id: user.user_id,
        }
    )
    res.json({
        result : 0,
        detail : 'link saved'
    });
});

router.get('/get', async function (req, res, next) {
    if (!req.query.id) {
        res.json({
            result : 1,
            detail : 'user id is empty',
        });
        return
    }
    let links = await db.user_links.findAll({
        where: {
            user_id: req.query.id
        },
        order: [['id', 'DESC']]
    })
    let linked_users = []
    let linked_users_id = []
    let link_id = []
    for (let link of links) {
        let user = await db.user_data.findOne({
            where: {
                user_id: link.linked_user_id,
            }
        })
        linked_users.push(user.name)
        link_id.push(link.id)
        linked_users_id.push(link.linked_user_id)
    }
    res.json({
        result : 0,
        detail : 'your links',
        usernames : linked_users,
        user_id : linked_users_id,
        link_id : link_id
    })
})

router.delete('/delete', async function (req, res, next) {
    if (!req.query.id) {
        res.json({
            result : 1,
            detail : 'id can not be empty'
        })
        return
    }
    await db.user_links.destroy({where: {id: req.query.id}});
    res.json({
        result : 0,
        detail : "link deleted"
    })
})

module.exports = router;