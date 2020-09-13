var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema(
    {
        id: Number,
        name: String,
        description: String,
        price: Number,
        gender: String,
        photo: String,
        type_id: Number,
        user_id: Number,
    },
    {
        timestamps: true,
        toJSON: {virtuals: true}
    }
)

listingSchema.virtual('type', {
    ref: 'Type',
    localField: 'type_id',
    foreignField: 'id',
    justOne: true,
})

listingSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'id',
    justOne: true,
})

listingSchema.virtual('category', {
    ref: 'Category',
    localField: 'category_id',
    foreignField: 'id',
    justOne: true,
})

module.exports = mongoose.model('Listing', listingSchema)