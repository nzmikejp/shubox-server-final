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

commentSchema.virtual('listing', {
    ref: 'Listing',
    localField: 'listing_id',
    foreignField: 'id',
    justOne: true,
})

commentSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'id',
    justOne: true,
})

module.exports = mongoose.model('Comment', commentSchema)