const express = require('express');
const { body } = require('express-validator');
const { register, login, getProfile } = require('../Controllers/user.controller');
const {auth} = require('../Middleware/auth');
const router = express.Router();

const registerValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Le nom doit contenir au moins 2 caractères'),
  body('email').isEmail().withMessage('Email invalide'),
  body('phone').isMobilePhone().withMessage('Numéro de téléphone invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

router.post('/register', registerValidation, register);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router;