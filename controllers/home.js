
const express = require('express');

const router = express.Router();

const md5 = require('md5');

// 用户模型
const users = require('../models/users');

// 渲染前台页面
router.get('/', (req,res) => {
	res.render('home/index', {});
});

// 渲染前台注册页面
router.get('/register', (req, res) => {
	res.render('home/register', {});
});

// 渲染登录页面
router.get('/login', (req,res) => {
	res.render('home/login', {});
});

// 处理注册用户
router.post('/register', (req, res) => {
	// SQL
	let query = 'INSERT INTO `users` set ?';
	// 根据SQL语句插入
	users.insert(query, req.body, (err, data) => {
		if(err) return console.log(err);
		// 响应浏览结果
		res.json({
			code: 10000,
			msg: 'OK',
			result: {}
		});
	});
});

// 处理登录用户
router.post('/login', (req, res) => {
	// SQL
	let query = 'SELECT `pass`,`name`,`avatar`,`id` FROM `users` WHERE ?';
	// 根据条件(邮箱)查询密码
	users.find(query, {email: req.body.email}, (err, result) => {
		if(err) return console.log(err);

		// 将数据中的密码与用户提交的比对
		let isLogin = result[0].pass == md5(req.body.pass)?true : false;

		// 一致则成功
		if(isLogin) {
			// 在session 记录登陆者信息
			req.session.logInfo = {
				id: result[0].id,
				name: result[0].name,
				avatar: result[0].avatar
			};

			// 存一个session表示成功了
			req.session.isLogin = isLogin;

			res.json({
				code: 10000,
				msg: 'OK',
				result: {}
			});
		} else { // 否则登录失败
			res.json({
				code: 10001,
				msg: 'fail',
				result: {}
			});
		}
	});
});

// 退出登录
router.post('/logout', (req, res) => {
	req.session.isLogin = null;
	req.session.logInfo = null;

	res.json({
		code: 10000,
		msg: '退出成功',
		result: {}
	});

});

module.exports = router;