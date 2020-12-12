const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    position: String,
    club: String,
    nationality: String,
    leagueId: String 
});

module.exports = mongoose.model('Player', playerSchema);
