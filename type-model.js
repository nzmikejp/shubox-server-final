var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var typeSchema = new Schema(
    {
        id: Number,
        name: String,
    },
    {
        timestamps: true,
        toJSON: {virtuals: true}
    }
)

typeSchema.virtual('items', {
    ref: 'Item',
    localField: 'id',
    foreignField: 'type_id',
    justOne: false,
})

module.exports = mongoose.model('Type', typeSchema)