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
module.exports.updateSurveyResult = (query,body) => {
    return SurveyResultModel.findOneAndUpdate(query,body,{new:true});
}
module.exports.deleteSurveyResult = (id) => {
    return SurveyResultModel.findByIdAndDelete(id);
}