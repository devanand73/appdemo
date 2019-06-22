const database = require('../helper/database');
const Schema = database.Schema;

const mscript = new Schema({
    name: String,
    status: Boolean,
    created_date: String,
    steps: []
});

module.exports = database.model('scripts', mscript);