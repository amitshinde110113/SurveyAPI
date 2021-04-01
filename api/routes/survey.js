const express = require('express');
const router = express.Router();
const surveyCtrl = require('../controllers/survey')
const checkAccess = require('../middleware/check-access')




/*  Create survey . */
router.post('/', checkAccess,surveyCtrl.create);

/*  Get all surveys . */
router.get('/',checkAccess,surveyCtrl.getAll );

/*  Get survey by Id . */
router.get('/:id', surveyCtrl.getById);

/*  Delete survey . */
router.delete('/:id',checkAccess, surveyCtrl.delete);









module.exports = router;
