const QuestionModel = require('../models/questionModel')


module.exports.createQuestion = (question) => {
    question = new QuestionModel(question);
    return question.save()
}
module.exports.getQuestion = (query) => {
    return QuestionModel.findOne(query);
}
module.exports.updateQuestion = (query,body) => {
    return QuestionModel.findOneAndUpdate(query,body,{new:true});
}
module.exports.getAllQuestions = () => {
    return QuestionModel.find();
}

module.exports.deleteQuestion = (id) => {
    return QuestionModel.findOneAndDelete({_id:id});
}