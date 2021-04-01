
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const questionSchema = mongoose.Schema({
    question: { type: String },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
});
questionSchema.plugin(timestamps);
module.exports = mongoose.model('Squestion', questionSchema);