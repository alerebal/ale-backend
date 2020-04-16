const { Schema, model } = require('mongoose');

const messegeSchema = new Schema({
    name: String,
    email: String,
    message: String
}, {
    timestamps: true
})

module.exports = model('AleMessage', messegeSchema)