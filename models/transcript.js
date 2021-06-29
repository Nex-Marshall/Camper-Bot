const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    AuthorID: String,
    Content: String
})


module.exports = mongoose.model('modmail-transcripts', Schema);