
const { getSurveyResult, getAllSurveyResults, deleteSurveyResult, createSurveyResult } = require('../data/managers/surveyResultsManager')



/*  Create survey result . */
exports.create = (req, res, next) => {
    const surveyResult = {
        question: req.body.question,
        survey: req.body.survey,
        user: req.currentUser._id,
        rating: req.body.rating
    };
    createSurveyResult(surveyResult).then(async (result) => {
        res.status(201).json({
            message: 'Recorded successfully.',
            surveyResult: result,
        });
    }).catch(err => {
        res.status(400).json(err);
    });

}


/*  Get all survey results . */
exports.getAll = (req, res, next) => {
    getAllSurveyResults().then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}
/*  Get survey result by Id . */
exports.getById = (req, res, next) => {
    const query = { _id: req.params.id }
    getSurveyResult(query).then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}
/*  Delete survey result. */
exports.delete = (req, res, next) => {
    deleteSurveyResult(req.params.id).then(async (result) => {
        res.status(204);
    }).catch(err => {
        res.status(400).json(err);
    });
}


