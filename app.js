/**
 * Created by vabole on 12.12.16.
 */
"use strict";
const express = require('express');
const logger = require('morgan');

const index = require('./routes/index');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));
app.set('x-powered-by', false);
app.use( bodyParser.json());

app.use('/', index);
app.use(express.static('static'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).end();
});

module.exports = app;