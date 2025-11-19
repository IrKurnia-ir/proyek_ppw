const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//route test
app.get('/api/healthcheck', (req, res) => {
    res.json({ message: "Server its Work!"});
} );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server work on PORT ${PORT}');
});

