const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashishkushwah179:As%40040201@cluster0.jvabvnn.mongodb.net/');

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