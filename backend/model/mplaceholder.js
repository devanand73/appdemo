const database = require('../helper/database');
const Schema = database.Schema;

const mplaceholder = new Schema({
    name: String,
    status: Boolean,
    createdDate: String,
});

module.exports = database.model('placeholder', mplaceholder);