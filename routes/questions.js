var express = require('express');
var router = express.Router();
const QuestionModel = require('../models/questionModel')
const mongoose = require('mongoose')




/*  create question . */
router.post('/', async function (req, res, next) {
    const question = new QuestionModel({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
    });
    question.save().then(async (result) => {
        res.status(201).json({
            message: 'Created successfully.',
            question: result,
        });
    }).catch(err => {
        console.log('err', err)
        res.status(400).json(err);
    });
});


router.get('/', async function (req, res, next) {

    QuestionModel.find().then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        console.log('err', err)
        res.status(400).json(err);
    });
});
router.get('/:id', async function (req, res, next) {
    QuestionModel.findById(req.params.id).then(async (result) => {
        res.status(201).json(result);
    }).catch(err => {
        console.log('err', err)
        res.status(400).json(err);
    });
});









module.exports = router;
