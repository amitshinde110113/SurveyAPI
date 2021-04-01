const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const surveyRoutes = require('./survey');
const surveyResultRoutes = require('./survey-result');
const questionRoutes = require('./questions');
const checkAuth = require('../middleware/check-auth');

// User module routes
router.use('/users', userRoutes)

// Surveys module routes
router.use('/surveys', checkAuth, surveyRoutes)

// Questions module routes
router.use('/questions', checkAuth, questionRoutes)

// Results module routes
router.use('/results', checkAuth, surveyResultRoutes)


module.exports = router;