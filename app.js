var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {
    res.sendFile("/html/index.html", {root: __dirname + '/public/'});
});

app.use("/notes", require('./routes/noteRoutes.js'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else {
        next(err);
    }
});

const hostname = '127.0.0.1';
const port = 3434;
console.log(`Server running at http://${hostname}:${port}/`);

module.exports = app;