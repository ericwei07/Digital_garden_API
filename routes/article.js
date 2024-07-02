var express = require('express');
var db = require('../config/database.js');
const {where} = require("sequelize");
var router = express.Router();

router.post('/post', async function(req, res, next) {
    if (!req.body.title || !req.body.content || !req.body.writer) {
        res.json({
            result : 1,
            detail : 'title/content/author can not be empty'
        })
        return
    }
    await db.garden_data.create({
        title: req.body.title,
        content: req.body.content,
        date_publish: Date.now(),
        writer: req.body.writer,
    });
    res.json({
        result : 0,
        detail : 'article successfully posted'
    });
});

router.post('/update', async function(req, res, next) {
    if (!req.body.title || !req.body.content) {
        res.json({
            result : 1,
            detail : 'title/content can not be empty'
        })
        return
    }
    let article = await db.garden_data.findOne({where: {article_id: req.body.id}});
    article.title = req.body.title;
    article.content = req.body.content;
    article.date_edit = Date.now();
    await article.save()
    res.json({
        result : 0,
        detail : 'title/content updated successfully'
    });
});

router.get('/get', async function(req, res, next) {
    if (!req.query.id) {
        res.json({
            result : 1,
            detail : 'id can not be empty'
        })
        return
    }
    let article = await db.garden_data.findOne({
        where: {
            article_id: req.query.id
        }
        }
    )
    if (!article) {
        res.json({
            result : 1,
            detail : 'article does not exist'
        })
        return
    }
    res.json(
        {
            result : 0,
            detail : 'successfully get article',
            content: article.content,
            date_edit: article.date_edit,
            date_publish: article.date_publish,
            title: article.title,
            writer: article.writer,
            id : article.article_id
        }
    );
});

router.get('/list', async function(req, res, next) {
    console.log(req.query);
    if (!req.query.id) {
        let list = await db.garden_data.findAll( {
            limit: 50,
            order: [['date_publish', 'DESC']]
            }
        )
        res.json({
            result : 0,
            detail : 'list of articles for all user',
            list: list
        });
        return
    }
    let list = await db.garden_data.findAll({
        where: {
            writer: req.query.id
        },
        limit: 20,
        order: [['date_publish', 'DESC']]
        }
    )
    if (!list) {
        res.json({
            result : 1,
            detail : 'user does not exist'
        });
        return
    }
    res.json( {
        result : 0,
        detail : 'list of articles for specific user',
        list: list
    });
});

router.delete('/delete', async function (req, res, next) {
    if (!req.query.id) {
        res.json({
            result : 1,
            detail : 'id can not be empty'
        });
    }
    await db.garden_data.destroy({where: {article_id: req.query.id}});
    res.json({
        result : 0,
        detail : 'deleted successfully'
    });
});

module.exports = router;
