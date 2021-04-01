const { getSurvey, getAllSurveys, deleteSurvey, createSurvey } = require('../data/managers/surveyModelManager')




/*  Create survey . */
exports.create = (req, res, next) => {
    const survey = { name: req.body.name }
    createSurvey(survey).then(async (result) => {
        res.status(201).json({
            message: 'Created successfully.',
            survey: result,
        });
    }).catch(err => {
        res.status(400).json(err);
    });
}

/*  Get all surveys . */
exports.getAll = (req, res, next) => {
    getAllSurveys().then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}


/*  Get survey by Id . */
exports.getById = (req, res, next) => {
    const query = { _id: req.params.id }
    getSurvey(query).then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}


/*  Delete survey . */
exports.delete = (req, res, next) => {
    deleteSurvey(req.params.id).then(async (result) => {
        res.status(204);
    }).catch(err => {
        res.status(400).json(err);
    });
}










