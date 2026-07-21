const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Veterinarians']

    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('veterinarians')
            .find();

        const veterinarians = await result.toArray();

        res.status(200).json(veterinarians);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Veterinarians']

    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid veterinarian ID'
            });
        }

        const veterinarianId = new ObjectId(req.params.id);

        const veterinarian = await mongodb
            .getDatabase()
            .db()
            .collection('veterinarians')
            .findOne({ _id: veterinarianId });

        if (!veterinarian) {
            return res.status(404).json({
                message: 'Veterinarian not found'
            });
        }

        res.status(200).json(veterinarian);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const createVeterinarian = async (req, res) => {
    //#swagger.tags=['Veterinarians']

    try {

        const veterinarian = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            specialty: req.body.specialty,
            licenseNumber: req.body.licenseNumber,
            email: req.body.email,
            phone: req.body.phone,
            yearsExperience: Number(req.body.yearsExperience),
            clinic: req.body.clinic
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('veterinarians')
            .insertOne(veterinarian);

        if (response.acknowledged) {
            return res.status(201).json({
                message: 'Veterinarian created successfully',
                id: response.insertedId
            });
        }

        res.status(500).json({
            message: 'Failed to create veterinarian'
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


const updateVeterinarian = async (req, res) => {
    //#swagger.tags=['Veterinarians']

    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid veterinarian ID'
            });
        }

        const veterinarianId = new ObjectId(req.params.id);

        const veterinarian = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            specialty: req.body.specialty,
            licenseNumber: req.body.licenseNumber,
            email: req.body.email,
            phone: req.body.phone,
            yearsExperience: Number(req.body.yearsExperience),
            clinic: req.body.clinic
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('veterinarians')
            .replaceOne({ _id: veterinarianId }, veterinarian);

        if (response.matchedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({
            message: 'Veterinarian not found'
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteVeterinarian = async (req, res) => {
    //#swagger.tags=['Veterinarians']

    try {

        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: 'Invalid veterinarian ID'
            });
        }

        const veterinarianId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('veterinarians')
            .deleteOne({ _id: veterinarianId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        res.status(404).json({
            message: 'Veterinarian not found'
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
    createVeterinarian,
    updateVeterinarian,
    deleteVeterinarian
};