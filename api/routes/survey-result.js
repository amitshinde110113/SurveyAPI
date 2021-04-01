var express = require('express');
var router = express.Router();
const surveyResultCtrl = require('../controllers/survey-result')


/*  Create survey result . */
router.post('/', surveyResultCtrl.create);

/*  Get all survey results . */
router.get('/', surveyResultCtrl.getAll);

/*  Get survey result by Id . */
router.get('/:id', surveyResultCtrl.getById);

/*  Delete survey result. */
router.delete('/:id', surveyResultCtrl.delete);


module.exports = router;
