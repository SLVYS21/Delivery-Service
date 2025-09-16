const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const {expressValidator, validationResult} = require('express-validator');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const userController = ({
    register: async(req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, phone, password, role, vehicleType, companyName } = req.body;

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
            }

            // Créer l'utilisateur
            const userData = { name, email, phone, password };
            
            // Ajouter des champs spécifiques selon le rôle
            if (role === 'deliverer' && vehicleType) {
                userData.role = 'deliverer';
                userData.vehicleType = vehicleType;
            } else if (role === 'merchant' && companyName) {
                userData.role = 'merchant';
                userData.companyName = companyName;
                userData.companyDescription = req.body.companyDescription;
                userData.businessCategory = req.body.businessCategory;
            }

            const user = new User(userData);
            await user.save();

            const token = generateToken(user._id);

            res.status(201).json({
                message: 'Utilisateur créé avec succès',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })   
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;

            // Vérifier si l'utilisateur existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Identifiants invalides' });
            }

            // Vérifier le mot de passe
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Identifiants invalides' });
            }

            const token = generateToken(user._id);

            res.json({
                message: 'Connexion réussie',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    companyName: user.companyName,
                    vehicleType: user.vehicleType
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    },
    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
});

module.exports = userController;
