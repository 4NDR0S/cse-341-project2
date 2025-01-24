const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req,res) => { res.send('Project 2 - Movies');});

router.use('/movies', require('./movies'));

router.use('/actors', require('./actors'));

module.exports = router;
