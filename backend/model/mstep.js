const database = require('../helper/database');
const Schema = database.Schema;

const StepSchema = new Schema({
    stepsDetail: Array,
    stepsName: String,
    status: Boolean,
    created_date: String,
});

const Mstep = database.model('steps', StepSchema);
module.exports = Mstep;