var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();

router.post('/add', async function (req, res, next) {
    if (!req.body.user_id || !req.body.content) {
        res.json({
            result : 1,
            detail : 'user id or content is empty',
        });
        return
    }
    await db.comments_data.create({
            author_id: req.body.user_id,
            content: req.body.content,
            create_date: Date.now(),
        }
    )
    res.json({
        result : 0,
        detail : 'comment saved'
    });
});

router.get('/get', async function (req, res, next) {
    if (!req.query.article_id) {
        res.json({
            result : 1,
            detail : 'article id is empty',
        });
        return
    }
    let comments = await db.comments_data.findAll({
        where: {
            article_id: req.query.article_id
        },
        order: [['comment_id', 'DESC']]
    })
    res.json({
        result : 0,
        detail : 'comments for specific article',
        content : comments
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
    await db.comments_data.destroy({where: {id: req.query.id}});
    res.json({
        result : 0,
        detail : "comment deleted"
    })
})

module.exports = router;