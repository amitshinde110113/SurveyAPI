var express = require('express');
var router = express.Router();
const questionCtrl = require('../controllers/questions')



/*  Create question . */
router.post('/', questionCtrl.create);

/*  Get all question . */
router.get('/', questionCtrl.getAll);

/*  Get question by Id . */
router.get('/:id', questionCtrl.getById);

/*  Delete question . */
router.delete('/:id', questionCtrl.delete);




module.exports = router;
