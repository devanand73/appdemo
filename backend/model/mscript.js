const database = require('../helper/database');
const Schema = database.Schema;

const mscript = new Schema({
    script: String,
    status: Boolean,
    created_date: String,
});

module.exports = database.model('scripts', mscript);