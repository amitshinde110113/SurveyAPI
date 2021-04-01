// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    host: process.env.HOST ,
    port: process.env.PORT,
    dbURL:process.env.DB_URL,
    jwtSecret:process.env.JWT_SECRET,
};