const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    name: String,
    nation: String
});

module.exports = mongoose.model('League', leagueSchema);