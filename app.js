const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/index.js');
const mongoose = require('mongoose');
const session = require('express-session');
const errorHandler = require('errorhandler');

require('./models/User');
require('./config/passport');

mongoose.Promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'test',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

if (!isProduction) {
    app.use(errorHandler());
}

app.get('/', (req, res, next) => {
    res.send('Hello world');
});
app.use(require('./routes'));
app.use(function (req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.listen(config.PORT, () => {
    console.log('listening on ' + config.PORT);
});