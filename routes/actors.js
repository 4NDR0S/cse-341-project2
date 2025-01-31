const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');

//authentication
const { isAuthenticated } = require('../middleware/authenticate');
//

router.get('/', actorsController.getAllActors);

router.get('/:id', actorsController.getSingleActor);

//part 2
router.post('/', isAuthenticated, actorsController.createActor);

router.put('/:id', isAuthenticated, actorsController.updateActor);

router.delete('/:id', isAuthenticated, actorsController.deleteActor);

module.exports = router;