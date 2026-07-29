const express = require('express');
const router = express.Router();

const veterinariansController = require('../controllers/veterinarians');

const veterinarianValidation = require('../middleware/veterinarianValidation');
const validate = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

// #swagger.tags = ['Veterinarians']
// #swagger.description = 'Returns all Veterinarians.'
router.get('/', veterinariansController.getAll);

// #swagger.tags = ['Veterinarians']
// #swagger.description = 'Returns a veterinarian by ID.'
router.get('/:id', veterinariansController.getSingle);

// #swagger.tags = ['Veterinarians']
// #swagger.description = 'Creates a new veterinarian. Requires GitHub authentication.'
router.post('/', isAuthenticated, veterinarianValidation(), validate, veterinariansController.createVeterinarian);

// #swagger.summary = 'Update a veterinarian'
// #swagger.description = 'Requires GitHub authentication.'
router.put('/:id', isAuthenticated, veterinarianValidation(), validate, veterinariansController.updateVeterinarian);

// #swagger.summary = 'Delete a veterinarian'
// #swagger.description = 'Requires GitHub authentication.'
router.delete('/:id', isAuthenticated, veterinariansController.deleteVeterinarian);

module.exports = router;