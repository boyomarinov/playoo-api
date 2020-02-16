import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from './config/index.js';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(config.PORT, () => {
    console.log('listening on ' + config.PORT);
});

app.get('/', (req, res) => {
    res.send('Hello world');
});
