const express = require('express');
const router = express.Router();
const surveyResultCtrl = require('../controllers/survey-result')
const checkAccess = require('../middleware/check-access')


/*  Create survey result . */
router.post('/', surveyResultCtrl.create);

/*  Get all survey results . */
router.get('/',checkAccess, surveyResultCtrl.getAll);

/*  Get survey result by Id . */
router.get('/:id',checkAccess, surveyResultCtrl.getById);

/*  Delete survey result. */
router.delete('/:id',checkAccess, surveyResultCtrl.delete);


module.exports = router;
