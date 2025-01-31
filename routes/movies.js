const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

//authentication
const { isAuthenticated } = require('../middleware/authenticate');
//

//get
router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

// post and put
router.post('/', isAuthenticated, moviesController.createMovie);

router.put('/:id', isAuthenticated, moviesController.updateMovie);

// delete
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;