const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// data validator
const validateActorData = (actor) => {
    if (!actor.name || !actor.birth || !actor.nationality || !actor.filmography) {
        return false;
    }
    return true;
};

const getAllActors = async (req, res) => {
    try {
        //#swagger.tags=['Actors']
        const result = await mongodb.getDatabase().db().collection('actors').find();
        result.toArray().then((Actors) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(Actors);
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching actors' });
    }
};

const getSingleActor = async (req, res) => {
    try {
        //#swagger.tags=['Actors']
        const ActorId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('actors').find({ _id: ActorId });
        result.toArray().then((Actors) => {
            if (Actors.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(Actors[0]);
            } else {
                res.status(404).json({ error: 'Actor not found' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching actor' });
    }
};

const createActor = async (req, res) => {
    try {
        //#swagger.tags=['Actors']
        const actor = req.body;
        
        // data validator
        if (!validateActorData(actor)) {
            return res.status(400).json({ error: 'Missing required actor fields' });
        }

        const response = await mongodb.getDatabase().db().collection('actors').insertOne(actor);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Actor created successfully' });
        } else {
            res.status(500).json({ error: 'Error creating the actor' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error creating actor' });
    }
};

const updateActor = async (req, res) => {
    try {
        //#swagger.tags=['Actors']
        const ActorId = new ObjectId(req.params.id);
        const actor = req.body;

        // data validator
        if (!validateActorData(actor)) {
            return res.status(400).json({ error: 'Missing required actor fields' });
        }

        const response = await mongodb.getDatabase().db().collection('actors').replaceOne({ _id: ActorId }, actor);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating actor' });
    }
};

const deleteActor = async (req, res) => {
    try {
        //#swagger.tags=['Actors']
        const ActorId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('actors').deleteOne({ _id: ActorId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting actor' });
    }
};

module.exports = {
    getAllActors,
    getSingleActor,
    createActor,
    updateActor,
    deleteActor
};