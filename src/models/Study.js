const { Schema, model } = require('mongoose');

const studySchema = new Schema({
    title: String,
    desc: String,
    year: String
}, {
    timestamps: true
});

module.exports = model('AleStudy', studySchema);