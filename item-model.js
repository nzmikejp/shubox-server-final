var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema(
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

itemSchema.virtual('type', {
    ref: 'Type',
    localField: 'type_id',
    foreignField: 'id',
    justOne: true,
})

module.exports = mongoose.model('Item', itemSchema)