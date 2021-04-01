const QuestionModel = require('../models/questionModel')


module.exports.createQuestion = (question) => {
    question = new QuestionModel(question);
    return question.save()
}
module.exports.getQuestion = (query) => {
    return QuestionModel.findOne(query);
}

module.exports.getAllQuestions = () => {
    return QuestionModel.find();
}

module.exports.deleteQuestion = (id) => {
    return QuestionModel.findByIdAndDelete(id);
}