let createError = require('http-errors');
const express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const { sequelize } = require('./config/database');
let cors = require('cors');

let indexRouter = require('./routes/index');
let userRouter = require('./routes/user');
let accountRouter = require('./routes/account');
let articleRouter = require('./routes/article');
let linksRouter = require('./routes/links');
let commentRouter = require('./routes/comment');

const app = express();
const port = process.env.PORT || 3001;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/user', userRouter);
app.use('/article', articleRouter);
app.use('/links', linksRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log('Server is running on port 3001');
    });
}).catch(err => {
    console.log('Error: ', err);
});

module.exports = app;
