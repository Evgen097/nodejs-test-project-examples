
var mongoose    = require('mongoose');

// Schemas
var Schema = mongoose.Schema;
var Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true
    },
    url: { type: String, required: true }
});

module.exports = Images;




