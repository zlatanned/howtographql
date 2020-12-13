const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    leagueId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Player', playerSchema);