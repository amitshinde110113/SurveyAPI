const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    password: { type: String, required: true },
    name: { type: String },
});
userSchema.plugin(timestamps);
module.exports = mongoose.model('SurveyUser', userSchema);