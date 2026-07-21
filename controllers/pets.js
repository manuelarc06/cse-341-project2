const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Pets']

    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .find();

        const pets = await result.toArray();

        res.status(200).json(pets);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Pets']

    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid pet ID'
            });
        }

        const petId = new ObjectId(req.params.id);

        const pet = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .findOne({ _id: petId });

        if (!pet) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        res.status(200).json(pet);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createPet = async (req, res) => {
    //#swagger.tags=['Pets']

    try {

        const pet = {
            name: req.body.name,
            species: req.body.species,
            breed: req.body.breed,
            age: req.body.age,
            gender: req.body.gender,
            color: req.body.color,
            weight: req.body.weight
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .insertOne(pet);

        if (response.acknowledged) {
            return res.status(201).json({
                message: 'Pet created successfully',
                id: response.insertedId
            });
        }

        res.status(500).json({
            message: 'Failed to create pet'
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const updatePet = async (req, res) => {
    //#swagger.tags=['Pets']

    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid pet ID'
            });
        }

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

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .replaceOne({ _id: petId }, pet);

        if (response.matchedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({
            message: 'Pet not found'
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deletePet = async (req, res) => {
    //#swagger.tags=['Pets']

    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid pet ID'
            });
        }

        const petId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('pets')
            .deleteOne({ _id: petId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({
            message: 'Pet not found'
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
};