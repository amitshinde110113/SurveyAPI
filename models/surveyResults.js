
const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const resultSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rating: { type: String },
    survey: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Squestion'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurveyUser'
    },
});
resultSchema.plugin(timestamps);
module.exports = mongoose.model('sresult', resultSchema);