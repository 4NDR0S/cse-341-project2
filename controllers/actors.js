const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllActors = async (req, res) => {
    //#swagger.tags=['Actors']
    const result = await mongodb.getDatabase().db().collection('actors').find();
    result.toArray().then((Actors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Actors);
    });
};

const getSingleActor = async (req, res) =>{
    //#swagger.tags=['Actors']
    const ActorId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('actors').find({ _id: ActorId });
    result.toArray().then((Actors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(Actors[0]);
    });
};


const createActor = async (req, res) =>{
    //#swagger.tags=['Actors']
    const Actor = {
        name: req.body.name,
        birth: req.body.birth,
        nationality: req.body.nationality,
        filmography: req.body.filmography
    };
    const response = await mongodb.getDatabase().db().collection('actors').insertOne(Actor);
    if (response.acknowledged){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the Actor')
    }
};

const updateActor = async (req, res) =>{
    //#swagger.tags=['Actors']
    const ActorId = new ObjectId(req.params.id)
    const Actor = {
        name: req.body.name,
        birth: req.body.birth,
        nationality: req.body.nationality,
        filmography: req.body.filmography
    };
    const response = await mongodb.getDatabase().db().collection('actors').replaceOne({ _id: ActorId }, Actor);
    if (response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the Actor')
    }
};

const deleteActor = async (req, res) =>{
    //#swagger.tags=['Actors']
    const ActorId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('actors').deleteOne({ _id: ActorId });
    if (response.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the Actor')
    }
};

module.exports = {
    getAllActors,
    getSingleActor,
    createActor,
    updateActor,
    deleteActor
};