const Service = require('../Models/service.model');
const User = require('../Models/user.model');
const Order = require('../Models/order.model');

const serviceController = ({
    getServices: async(req, res) => {
        try {
            const { category, search} = req.query;
            let query = { isActive: true };
            
            if (category) {
                query.category = category;
            }

            if (search) {
                query.name = { $regex: search, $options: 'i' };
            }

            const services = await Service.find(query)
            .populate('merchantId', 'companyName companyDescription')
            .sort({ createdAt: -1 });

            res.json(services);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des services' });
        }
    },
    createMerchantService: async (req, res) => {
        try {
            if (req.user.role !== 'merchant') {
                return res.status(403).json({ message: 'Seuls les marchands peuvent créer des services' });
            }

            const { name, description, price } = req.body;

            const service = new Service({
                name,
                description,
                price,
                category: 'merchant_service',
                merchantId: req.user.id
            });

            await service.save();

            res.status(201).json({
                message: 'Service créé avec succès',
                service
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la création du service' });
        }
    },
    upgradeToMerchant: async (req, res) => {
        try {
            const { userId } = req.params;
            const { companyName, companyDescription, businessCategory } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            if (user.role !== 'user') {
                return res.status(400).json({ message: 'L\'utilisateur doit être un utilisateur simple' });
            }

            user.role = 'merchant';
            user.companyName = companyName;
            user.companyDescription = companyDescription;
            user.businessCategory = businessCategory;
            user.isVerified = true;

            await user.save();

            res.json({
                message: 'Utilisateur upgradé en marchand avec succès',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    companyName: user.companyName
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'upgrade' });
        }
    },
    assignOrderToDeliverer: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { delivererId } = req.body;

            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Commande non trouvée' });
            }

            const deliverer = await User.findById(delivererId);
            if (!deliverer || deliverer.role !== 'deliverer') {
                return res.status(400).json({ message: 'Livreur non valide' });
            }

            order.delivererId = delivererId;
            order.status = ORDER_STATUS.ASSIGNED;
            order.statusHistory.push({
                status: ORDER_STATUS.ASSIGNED,
                updatedBy: req.user.id
            });

            await order.save();

            res.json({
                message: 'Commande assignée avec succès',
                order
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'assignation' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const { role } = req.query;
            let query = {};
            
            if (role) {
            query.role = role;
            }

            const users = await User.find(query).select('-password').sort({ createdAt: -1 });
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const { status, orderType } = req.query;
            let query = {};
            
            if (status) query.status = status;
            if (orderType) query.orderType = orderType;

            const orders = await Order.find(query)
            .populate('customerId', 'name phone')
            .populate('delivererId', 'name phone vehicleType')
            .populate('merchantId', 'companyName')
            .populate('items.serviceId')
            .sort({ createdAt: -1 });

            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
        }
    }
})

module.exports = serviceController;