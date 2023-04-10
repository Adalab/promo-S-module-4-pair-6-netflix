const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const actorsSchema = new Schema(
    {
        name: String,
        birthday: String,
        country: String,
        lastname: String,
    },
    { collection: 'Actors' }
);
const Actor = mongoose.model('Actors', actorsSchema);

module.exports = Actor;