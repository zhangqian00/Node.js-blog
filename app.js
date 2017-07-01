
const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

const path = require('path');

const home = require('./controllers/home');

const admin = require('./controllers/admin');

const app = express();

app.listen(3000);

// 配置模板引擎
app.set('view engine', 'xtpl');
app.set('views', path.join(__dirname, './views'));

// 静态资源
app.use(express.static(path.join(__dirname, './public')));
// 解析post数据
app.use(bodyParser.urlencoded({extended: false}));

// 如果简单在node 中解析session
app.use(session({
	secret: 'afadsf',
	resave: false,
	saveUninitialized: false
}));

// 只有后台需要进行验证
app.use('/admin', function(req, res, next){
	// 将登陆成功后的用户信息，赋值给全局模板变量
	app.locals.logInfo = req.session.logInfo;

	// 没有登录的状态下跳转至登录
	if(!req.session.isLogin){
		return res.redirect('/login');
	}

	// 调用下一个中间件
	next();
});

// 当访问 / 时，使用前台home的路由
app.use('/', home);

// 当访问 /admin开头，使用后台admin的路由
app.use('/admin', admin);
