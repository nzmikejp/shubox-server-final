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
    { 
        timestamps: true,
        toJSON: {virtuals: true}
    }
)

userSchema.virtual('listing', {
    ref: 'Listing',
    localField: 'id',
    foreignField: 'user_id',
    justOne: false,
})

module.exports = mongoose.model('User', userSchema)