const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    nationality: String,
    club: String,
    age: Number,
    leagueId: String 
});

module.exports = mongoose.model('Player', playerSchema);