const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    title : {type: String, required: true},
    url : {type: String, required: true}
});

module.exports = mongoose.model('Music', musicSchema)