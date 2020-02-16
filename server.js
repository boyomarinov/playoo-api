const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, function() {
    console.log('listening on 3000');
});

app.get('/', function (req, res) {
    res.send('Hello world');
});
