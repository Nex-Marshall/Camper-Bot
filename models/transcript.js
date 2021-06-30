const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    AuthorID: String,
    Content: Array
})


module.exports = mongoose.model('transcripts', Schema);