/* Module */
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

/* ============ */
require('./database/index')(process.env.ACCOUNT_KEY);
const PORT = process.env.PORT || 3000;
const general = require('./routers/general.js');
const app = express();

/* app */
app.use(cors());
app.use(helmet());
app.use('/api', general);
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

/* Status */
app.use('/api', async (req, res) => {

    res.send({
        status: true,
        message: 'Kato Rest',
        repo: 'KatowProject'
    });

});

// app.use('*', async (req, res) => {
//     res.status(404).send({ status: false, message: 'api not found' });
// });

/* Listener */
app.listen(PORT, async () => {
    console.log('Listening on PORT ' + PORT);
});