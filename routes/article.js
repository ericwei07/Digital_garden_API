var express = require('express');
var router = express.Router();

router.post('/post', function(req, res, next) {
    res.send('respond with a resource(post)');
});

router.post('/update', function(req, res, next) {
    res.send('respond with a resource(update)');
});

router.get('/get', function(req, res, next) {
    res.send('respond with a resource(get)');
});

router.get('/list', function(req, res, next) {
    res.send('respond with a resource(list)');
});

router.delete('/delete', function(req, res, next) {
    res.send('respond with a resource(delete)');
});

module.exports = router;
