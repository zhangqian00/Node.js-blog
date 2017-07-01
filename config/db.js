
const mysql = require('mysql');

const md5 = require('md5');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'blog'
});

db.md5 = md5;

module.exports = db;

