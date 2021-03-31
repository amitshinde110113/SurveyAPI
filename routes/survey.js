var express = require('express');
var router = express.Router();
const SurveyModel = require('../models/surveyModel')
const mongoose = require('mongoose')




/*  create survey . */
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
        console.log('err', err)
        res.status(400).json(err);
    });
});


router.get('/', async function (req, res, next) {

    SurveyModel.find().then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        console.log('err', err)
        res.status(400).json(err);
    });
});
router.get('/:id', async function (req, res, next) {
    SurveyModel.findById(req.params.id).then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        console.log('err', err)
        res.status(400).json(err);
    });
});









module.exports = router;
