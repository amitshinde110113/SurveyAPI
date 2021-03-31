
const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: { type: String },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
});
questionSchema.plugin(timestamps);
module.exports = mongoose.model('Squestion', questionSchema);