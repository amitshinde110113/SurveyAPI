var express = require('express');
var router = express.Router();
const SurveyModel = require('../models/surveyModel')
const mongoose = require('mongoose')




/*  Create survey . */
router.post('/', async function (req, res, next) {
    const survey = new SurveyModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    survey.save().then(async (result) => {
        res.status(201).json({
            message: 'Created successfully.',
            survey: result,
        });
    }).catch(err => {
         
        res.status(400).json(err);
    });
});

/*  Get all surveys . */

router.get('/', async function (req, res, next) {

    SurveyModel.find().then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
         
        res.status(400).json(err);
    });
});

/*  Get survey by Id . */

router.get('/:id', async function (req, res, next) {
    SurveyModel.findById(req.params.id).then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
         
        res.status(400).json(err);
    });
});

/*  Delete survey . */

router.delete('/:id', async function (req, res, next) {
    SurveyModel.findByIdAndDelete(req.params.id).then(async (result) => {
        res.status(204);
    }).catch(err => {
         
        res.status(400).json(err);
    });
});









module.exports = router;
