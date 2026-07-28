const express = require('express');
const router = express.Router();

const veterinariansController = require('../controllers/veterinarians');

const veterinarianValidation = require('../middleware/veterinarianValidation');
const validate = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', veterinariansController.getAll);

router.get('/:id', veterinariansController.getSingle);

router.post('/', isAuthenticated, veterinarianValidation(), validate, veterinariansController.createVeterinarian);

router.put('/:id', isAuthenticated, veterinarianValidation(), validate, veterinariansController.updateVeterinarian);

router.delete('/:id', isAuthenticated, veterinariansController.deleteVeterinarian);

module.exports = router;