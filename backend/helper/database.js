const mongoose = require('mongoose');
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true, 
    useCreateIndex: true
};
const url = "mongodb+srv://projectx:KmDHl0NtM7fL5PE9@cluster0-5aqpz.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, option);
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection refused !!!'));
db.once('open', console.log.bind(console, 'connection success !!!'));
module.exports = mongoose;