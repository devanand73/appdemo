const database = require('../helper/database');
const Schema = database.Schema;

const mplaceholder = new Schema({
    name: String,
    status: Boolean,
    created_date: String,
});

module.exports = database.model('placeholder', mplaceholder);