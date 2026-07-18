const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Pets']
    const result = await mongodb.getDatabase().db().collection('pets').find();
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Pets']
    const petId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('pets').find({ _id: petId });
    result.toArray().then((pets) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pets[0])
    });
};

const createPet = async (req, res) => {
    //#swagger.tags=['Pets']
    const pet = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        weight: req.body.weight
    };
    const response = await mongodb.getDatabase().db().collection('pets').insertOne(pet);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const updatePet = async (req, res) => {
    //#swagger.tags=['Pets']
    const petId = new ObjectId(req.params.id);
    const pet = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        weight: req.body.weight
    };
    const response = await mongodb.getDatabase().db().collection('pets').replaceOne({ _id: petId }, pet);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deletePet = async (req, res) => {
    //#swagger.tags=['Pets']
    const petId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('pets').deleteOne({ _id: petId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
};