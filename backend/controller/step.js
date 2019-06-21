const express = require('express');
const bodyParser = require('body-parser');
const ERROR = require('../config/error');
const Mstep = require('../model/mstep');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use(jsonParser, function(req, res, next) {
	next();
});

router.post('', function (req, res) {
	const data = req.body;
	const customer = new Mstep(data);
	customer.save(function (error, docs) {
		if (error) {
			res.status(400).send(ERROR.UNKOWN_ERROR);
		} else {
			res.status(201).send(docs);
		}
	});
});

router.put('', function (req, res) {
	const data = req.body;
	Mstep.updateOne({_id: data._id }, data, function (error, docs) {
		if (error) {
			res.status(400).send({ error: error });
		}
		res.status(201).send({id:data._id});
	});
});


router.get('', function (req, res) {
	Mstep.find({}, 'stepsName created_date', function (cerr, data) {
		if(cerr){
			res.status(204).send(ERROR.UNKOWN_ERROR);	
		}
		res.status(200).send(data);
	});
});


router.get('/find/:id', function (req, res) {
	const id = req.params.id;
	Mstep.findById(id, function (dbErr, docs) {
		if (dbErr) {
			res.status(400).send(ERROR.UNKOWN_ERROR);
		}
		res.status(201).send(docs);
	});
});


router.post('/delete', function (req, resPonse) {
	let ids = req.body.id;
	Mstep.findByIdAndRemove(ids, function (cerr, totalData) {
		resPonse.status(200).send({'msg': 'Data deleted successfully'});
	});
});

module.exports = router;
