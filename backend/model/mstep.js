const database = require('../helper/database');
const Schema = database.Schema;

const StepSchema = new Schema({
    stepName: String,
    status: Boolean,
    createdDate: String,
});

const Mstep = database.model('steps', StepSchema);
module.exports = Mstep;