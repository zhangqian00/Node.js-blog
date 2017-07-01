
const db = require('../config/db');

// 增
exports.insert = function(query,body,cb){
	// 密码密文处理
	body.pass = db.md5(body.pass);

	db.query(query, body, cb);
};

// 删
exports.delete = function() {

};

// 改
exports.update = function() {

};

// 查
exports.find = function(query, opt, cb){

	db.query(query, opt, cb);
};