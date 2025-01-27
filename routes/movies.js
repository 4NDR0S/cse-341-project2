const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

//get
router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

// post and put
router.post('/', moviesController.createMovie);

router.put('/:id', moviesController.updateMovie);

// delete
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;