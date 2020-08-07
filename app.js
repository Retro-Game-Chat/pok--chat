var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/server', require('./routes/server'));
app.use('/api/user', require('./routes/user'));
app.use('/api/member', require('./routes/member'));

app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/dist/index.html'))
});

module.exports = app;
