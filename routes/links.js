var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();

router.post('/add', async function (req, res, next) {
    if (!req.body.user_id || !req.body.linked_user_id) {
        res.json({
            result : 1,
            detail : 'user id is empty',
        });
        return
    }
    let link = await db.user_links.findOne({
        where: {
            user_id: req.body.user_id,
            linked_user_id: req.body.linked_user_id,
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
        user_id: req.body.linked_user_id,
        linked_user_id: req.body.linked_user_id,
        }
    )
    res.json({
        result : 0,
        detail : 'link saved'
    });
});

router.get('/get', async function (req, res, next) {
    if (!req.query.user_id) {
        res.json({
            result : 1,
            detail : 'user id is empty',
        });
        return
    }
    let links = await db.user_links.findAll({
        where: {
            user_id: req.query.user_id
        },
        order: [['id', 'ASC']]
    })
    let linked_users = []
    let linked_users_id = []
    for (let link of links) {
        let user = await db.user_data.findOne({
            where: {
                user_id: link.linked_user_id,
            }
        })
        linked_users.push(user)
        linked_users_id.push(link.linked_user_id)
    }
    res.json({
        result : 0,
        detail : 'your links',
        usernames: linked_users,
        ids: linked_users_id
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