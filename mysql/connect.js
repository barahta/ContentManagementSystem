const mysql = require("mysql");
const config = require("config");

const connectionMySql = mysql.createConnection({
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    database: config.get('database'),
})
export default connectionMySql