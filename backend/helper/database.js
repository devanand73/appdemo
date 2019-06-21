const mongoose = require('mongoose');
const url = "mongodb+srv://anand_15_06:0127ec071016@cluster0-r2nso.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection refused !!!'));
db.once('open', console.log.bind(console, 'connection success !!!'));
module.exports = mongoose;