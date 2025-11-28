const db = require('../config/db');

const UserModel = {
    findByEmail: (email) => {
        return db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    },

    createUser: (data) => {
        return db.promise().query("INSERT INTO users SET ?", data);
    }
};

exports.getUserByEmail = (email) => {
    return db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
}

module.exports = UserModel;



