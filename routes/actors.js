const express = require('express');
const router = express.Router();

const actorsController = require('../controllers/actors');

router.get('/', actorsController.getAllActors);

router.get('/:id', actorsController.getSingleActor);

//part 2
router.post('/', actorsController.createActor);

router.put('/:id', actorsController.updateActor);

router.delete('/:id', actorsController.deleteActor);

module.exports = router;