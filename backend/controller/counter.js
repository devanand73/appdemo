const express = require('express');
const router = express.Router();
const fileStream = require('fs');
const Mstep = require('../model/mstep');
const Mscript = require('../model/mscript');
const Mplaceh = require('../model/mplaceholder');

router.get('', async(req, res) => {
    try {
        const numscript = await Mscript.countDocuments();
        const stepCount = await Mstep.countDocuments();
        const placeCount = await Mplaceh.countDocuments();

        fileStream.readFile('./counter.txt', 'utf8', (err, data)=> {
            res.status(200).send({ totalDoc: data, numscript: numscript, stepCount: stepCount, phcount: placeCount });
        });
        
        
    } catch (err) {
        res.status(403).send({ err: err });
    }
});

router.post('', (req, res) => {
    fileStream.readFile('./counter.txt', 'utf8', (err, data)=> {
        const newNum = parseInt(data) + 1;
        fileStream.writeFile('./counter.txt',  newNum, (err, data)=> {
            
        });
    });

});


module.exports = router;