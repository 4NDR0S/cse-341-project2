const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// data validator
const validateMovieData = (movie) => {
    if (!movie.title || !movie.director || !movie.release || !movie.duration || !movie.genre) {
        return false;
    }
    return true;
};

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const result = await mongodb.getDatabase().db().collection('movies').find();
        result.toArray().then((Movies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(Movies);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movies' });
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const movieId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
        result.toArray().then((Movies) => {
            if (Movies.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(Movies[0]);
            } else {
                res.status(404).json({ error: 'Movie not found' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching movie' });
    }
};

const createMovie = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const movie = req.body;
        
        // data validator
        if (!validateMovieData(movie)) {
            return res.status(400).json({ error: 'Missing required movie fields' });
        }

        const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Movie created successfully' });
        } else {
            res.status(500).json({ error: 'Error creating the movie' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error creating movie' });
    }
};

const updateMovie = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const movieId = new ObjectId(req.params.id);
        const movie = req.body;

        // data validator
        if (!validateMovieData(movie)) {
            return res.status(400).json({ error: 'Missing required movie fields' });
        }

        const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating movie' });
    }
};

const deleteMovie = async (req, res) => {
    try {
        //#swagger.tags=['Movies']
        const movieId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting movie' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
};