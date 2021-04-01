const SurveyResultModel = require('../models/surveyResults')


module.exports.createSurveyResult = (surveyResult) => {
    surveyResult = new SurveyResultModel(surveyResult);
    return surveyResult.save()
}
module.exports.getSurveyResult = (query) => {
    return SurveyResultModel.findOne(query);
}

module.exports.getAllSurveyResults = () => {
    return SurveyResultModel.find();
}

module.exports.deleteSurveyResult = (id) => {
    return SurveyResultModel.findByIdAndDelete(id);
}