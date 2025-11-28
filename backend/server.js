const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

//route test
app.get('/api/healthcheck', (req, res) => {
    res.json({ message: "Server its Work!"});
} );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server work on PORT ${PORT}`);
});

