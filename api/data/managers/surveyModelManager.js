const SurveyModel = require('../models/surveyModel')


module.exports.createSurvey = (survey) => {
    survey = new SurveyModel(survey);
    return survey.save()
}
module.exports.getSurvey = (query) => {
    return SurveyModel.findOne(query);
}

module.exports.getAllSurveys = () => {
    return SurveyModel.find();
}

module.exports.deleteSurvey = (id) => {
    return SurveyModel.findByIdAndDelete(id);
}