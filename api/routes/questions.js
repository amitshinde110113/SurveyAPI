const express = require('express');
const router = express.Router();
const questionCtrl = require('../controllers/questions')



/*  Get all question . */
router.get('/', questionCtrl.getAll);

/*  Get question by Id . */
router.get('/:id', questionCtrl.getById);

/*  Create question . */
router.post('/',  questionCtrl.create);

/*  Update question . */
router.put('/:id',  questionCtrl.update);

/*  Delete question . */
router.delete('/:id', questionCtrl.delete);




module.exports = router;
