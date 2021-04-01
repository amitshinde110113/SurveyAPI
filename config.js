// config.js
const dotenv = require('dotenv');
dotenv.config();
const localConfig = {
    host: 'localhost',
    port: 3000,
    dbURL: 'DB_URL=mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    jwtSecret: 'demoSecrect'
}
module.exports = {
    host: process.env.HOST || localConfig.host,
    port: process.env.PORT || localConfig.port,
    dbURL: process.env.DB_URL || localConfig.dbURL,
    jwtSecret: process.env.JWT_SECRET || localConfig.jwtSecret,
};