const express = require('express');
const router = express.Router();

const veterinariansController = require('../controllers/veterinarians');

const veterinarianValidation = require('../middleware/veterinarianValidation');
const validate = require('../middleware/validate');

router.get('/', veterinariansController.getAll);

router.get('/:id', veterinariansController.getSingle);

router.post('/', veterinarianValidation(), validate, veterinariansController.createVeterinarian);

router.put('/:id', veterinarianValidation(), validate, veterinariansController.updateVeterinarian);

router.delete('/:id', veterinariansController.deleteVeterinarian);

module.exports = router;