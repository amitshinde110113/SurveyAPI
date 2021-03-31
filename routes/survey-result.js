var express = require('express');
var router = express.Router();
const SurveyResultModel = require('../models/surveyResults')
const mongoose = require('mongoose')




/*  create result . */
router.post('/', async function (req, res, next) {
    const surveyResult = new SurveyResultModel({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        survey: req.body.survey,
        user: req.currentUser._id,
        rating: req.body.rating
    });
    surveyResult.save().then(async (result) => {
        res.status(201).json({
            message: 'Recorded successfully.',
            surveyResult: result,
        });
    }).catch(err => {
        res.status(400).json(err);
    });
});


router.get('/', async function (req, res, next) {
    SurveyResultModel.find().then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
});

router.get('/:id', async function (req, res, next) {
    SurveyResultModel.findById(req.params.id).then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        res.status(400).json(err);
    });
});









module.exports = router;
