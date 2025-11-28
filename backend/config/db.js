const mysql = require('mysql2');
require('dotenv').config();

console.log("database name:", process.env.DB_DATABASE);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if(err) {
        console.log("Failed to connect database:", err);
        return;
    }
    console.log("Succes connect to database!");
});

module.exports = db;