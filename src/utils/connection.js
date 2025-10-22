const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: Number(process.env.MYSQL_PORT),
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = connection;
