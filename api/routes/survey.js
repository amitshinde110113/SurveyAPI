const express = require('express');
const router = express.Router();
const surveyCtrl = require('../controllers/survey')
const checkAccess = require('../middleware/check-access')



/*  Get all surveys . */
router.get('/',checkAccess,surveyCtrl.getAll );

/*  Get survey by Id . */
router.get('/:id', surveyCtrl.getById);

/*  Create survey . */
router.post('/', checkAccess,surveyCtrl.create);

/*  Update surevr . */
router.put('/:id',  surveyCtrl.update);

/*  Delete survey . */
router.delete('/:id',checkAccess, surveyCtrl.delete);









module.exports = router;
