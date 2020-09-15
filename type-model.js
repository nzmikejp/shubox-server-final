var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeSchema = new Schema(
    {
        id: Number,
        name: String,
        photo: String,
    },
    {
        timestamps: true,
        toJSON: {virtuals: true}
    }
)

typeSchema.virtual('listings', {
    ref: 'Listing',
    localField: 'id',
    foreignField: 'type_id',
    justOne: false,
})

module.exports = mongoose.model('Type', typeSchema)