let express = require('express');
const app = express();
const env = require('./config/config');

let step = require('./controller/step');
let script = require('./controller/script');
let counter = require('./controller/counter');

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);

	if (req.method === 'OPTIONS') {
		res.send('');
	} else {
		next();
	}
});

app.use('/counter', counter);
app.use('/script', script);
app.use('/step', step);

app.get('/', function (req, res) {
	res.send("web is working");
});

app.listen(env.PORT, function () {
	console.log("server is running");
});
