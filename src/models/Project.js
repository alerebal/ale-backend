const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    title: String,
    desc: String,
    imagePath: String,
    image_id: String,
    urlFront: String,
    frontCode: String,
    backCode: String
}, {
    timestamps: true
})

module.exports = model('Project', projectSchema);