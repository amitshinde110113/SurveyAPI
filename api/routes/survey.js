var express = require('express');
var router = express.Router();
const surveyCtrl = require('../controllers/survey')




/*  Create survey . */
router.post('/', surveyCtrl.create);

/*  Get all surveys . */
router.get('/',surveyCtrl.getAll );

/*  Get survey by Id . */
router.get('/:id', surveyCtrl.getById);

/*  Delete survey . */
router.delete('/:id', surveyCtrl.delete);









module.exports = router;
