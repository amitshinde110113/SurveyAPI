const { getQuestion, getAllQuestions, deleteQuestion, createQuestion ,updateQuestion } = require('../data/managers/questionModelManager')

/*  Create question . */

exports.create = (req, res, next) => {
    const question = { question: req.body.question }
    createQuestion(question).then(async (result) => {
        res.status(201).json({
            message: 'Created successfully.',
            question: result,
        });
    }).catch(err => {
        console.log('err', err)
        res.status(400).json(err);
    });
}

/*  Get all question . */
exports.getAll = (req, res, next) => {
    getAllQuestions().then( (result) => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });

}



/*  Get question by Id . */
exports.getById = (req, res, next) => {
    const query = { _id: req.params.id }
    getQuestion(query).then( (result) => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}

/*  Update questions . */
exports.update = (req, res, next) => {
    const query = { _id: req.params.id }
    updateQuestion(query,req.body).then( (result) => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}

/*  Delete question . */
exports.delete = (req, res, next) => {
    deleteQuestion(req.params.id).then( (result) => {
        res.status(204).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
}








