/* Module */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

/* ============ */
require('./database/index')(process.env.ACCOUNT_KEY);
const PORT = process.env.PORT || 3000;
const general = require('./routers/general.js');
const app = express();

/* app */
app.use(express.json());// for parsing application/json
app.use(cors());
app.use(helmet());
app.use('/api', general);
app.use(express.static(path.join(__dirname, 'public')));

/* Status */
app.use('/api', async (req, res) => {
    res.send({
        status: true,
        message: 'Kato Rest',
        repo: 'KatowProject'
    });
});

app.use('*', async (req, res) => {
    res.status(404).redirect('/404.html');
});

/* Listener */
app.listen(PORT, async () => {
    console.log('Listening on PORT ' + PORT);
});