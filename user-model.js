var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        id: Number,
        name: String,
        username: String,
        password: String,
        email: String,
        photo: String
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)