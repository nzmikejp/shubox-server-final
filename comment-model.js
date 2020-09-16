var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema(
    {
        id: Number,
        content: String,
        user_id: Number,
        listing_id: Number
    },
    { 
        timestamps: true,
        toJSON: {virtuals: true}
    }
)

commentSchema.virtual('listings', {
    ref: 'Listing',
    localField: 'listing_id',
    foreignField: 'id',
    justOne: false,
})

commentSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'id',
    justOne: false,
})

module.exports = mongoose.model('Comment', commentSchema)