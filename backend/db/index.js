const mongoose = require('mongoose');

mongoose.connect('mongo-url');

const cardSchema = new mongoose.Schema({
    username : String,
    description : String,
    interests : [String],
    linkedIn : String,
    twitter : String
})

const cards = mongoose.model('cards',cardSchema);

module.exports = {
    cards
}
