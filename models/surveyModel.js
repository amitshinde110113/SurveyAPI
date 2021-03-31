
const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const surveySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
});
surveySchema.plugin(timestamps);
module.exports = mongoose.model('Survey', surveySchema);