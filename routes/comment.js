var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();

router.post('/add', async function (req, res, next) {
    if (!req.body.user_id) {
        res.json({
            result : 1,
            detail : 'user id is empty',
        });
        return
    }
    if (!req.body.article_id) {
        res.json({
            result : 2,
            detail : 'article id is empty',
        });
        return
    }
    if (!req.body.content) {
        res.json({
            result : 3,
            detail : 'content is empty',
        });
        return
    }
    await db.comments_data.create(
        {
            author_id: req.body.user_id,
            content: req.body.content,
            article_id: req.body.article_id,
            create_date: Date.now(),
        }
    )
    res.json({
        result : 0,
        detail : 'comment saved'
    });
});

router.get('/get', async function (req, res, next) {
    if (!req.query.id) {
        res.json({
            result : 1,
            detail : 'article id is empty',
        });
        return
    }
    let comments = await db.comments_data.findAll({
        where: {
            article_id: req.query.id
        },
        limit: 100,
        order: [['comment_id', 'DESC']]
    })
    let names = []
    for (let comment of comments) {
        let author = await db.user_data.findOne({
            where : {
                user_id: comment.author_id
            }
        })
        names.push(author.name)
    }

    res.json({
        result : 0,
        detail : 'comments for specific article',
        content : comments,
        author_names : names
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
    await db.comments_data.destroy({where: {comment_id: req.query.id}});
    res.json({
        result : 0,
        detail : "comment deleted"
    })
})


module.exports = router;