const express = require('express');
const bodyParser = require('body-parser');
const ERROR = require('../config/error');
const Mscript = require('../model/mscript');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use(jsonParser, function(req, res, next) {
	next();
});

router.post('', function (req, res) {
	const data = req.body;
	const cat = new Mscript(data);
	cat.save(function (error, docs) {
		if (error) {
			res.status(400).send(ERROR.UNKOWN_ERROR);
		}
		res.status(201).send(docs);
	});
});


router.get('', function (req, res) {
	Mscript.find({}, null, function (cerr, data) {
		if(cerr){
			res.status(204).send(ERROR.UNKOWN_ERROR);	
		}
		res.status(200).send(data);
	});
});

router.post('/delete', function (req, resPonse) {
	let ids = req.body._id;
	Mscript.findOneAndRemove(ids, function (cerr, totalData) {
		if(cerr){
			resPonse.status(200).send(ERROR.UNKOWN_ERROR);
		}
		resPonse.status(200).send({msg: ERROR.DELTED});
	});
});


module.exports = router;
