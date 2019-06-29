const express = require('express');
const bodyParser = require('body-parser');
const ERROR = require('../config/error');
const Mscript = require('../model/mscript');
const Mstep = require('../model/mstep');
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
			res.status(400).send(error);
		}
		res.status(201).send(docs);
	});
});


router.put('', function (req, res) {
	const data = req.body;
	Mscript.findByIdAndUpdate({_id: data._id}, data, function(error, docs) {
		if (error) {
			res.status(400).send(error);
		}
		res.status(201).send(data);
	});
});

router.get('', function (req, res) {
	Mscript.find({}, null, function (cerr, data) {
		if(cerr){
			res.status(204).send(error);	
		}
		res.status(200).send(data);
	});
});

router.get('/find/:id', function (req, res) {
	const id = req.params.id;
	Mscript.findOne({'_id': id}, null, function (cerr, data) {
		if(cerr){
			res.status(204).send(error);	
		}
		res.status(200).send(data);
	});
});


router.get('/step/:id', async(req, res) => {
	const id = req.params.id;
	const data = await Mscript.findOne({'_id': id}, null).exec();
		if(data !== null && data['steps'] && data['steps'].length > 0){
			data['newsteps'] = [];
			data['steps'].forEach(element => {
				const steps = Mstep.findOne({'_id': element}).exec();
				console.log(steps);
				//data['newsteps'].push(steps);
			});
		   // res.status(200).send(data);
		   console.log(data);
		}
});

router.post('/delete', function (req, resPonse) {
	let ids = req.body._id;
	Mscript.findOneAndRemove(ids, function (cerr, totalData) {
		if(cerr){
			resPonse.status(200).send(error);
		}
		resPonse.status(200).send({msg: ERROR.DELTED});
	});
});

module.exports = router;
