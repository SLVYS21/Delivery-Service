const Order = require('../Models/order.model');
const { ORDER_STATUS, ORDER_TYPES } = require('../utils/constants');
const Service = require('../Models/service.model');
const User = require('../Models/user.model');

const orderController = ({
    createOrder: async(req, res) => {
        try {
            const {
                orderType,
                description,
                pickupLocation,
                deliveryLocation,
                vehicleType,
                merchantId,
                items
            } = req.body;

            let totalAmount = 0;

            // Calculer le prix selon le type de commande
            if (orderType === ORDER_TYPES.MERCHANT_ORDER) {
                for (const item of items) {
                    const service = await Service.findById(item.serviceId);
                    totalAmount += service.price * item.quantity;
                }
            } else {
            // Services de l'agence - calculer selon la distance et le véhicule
                const baseService = await Service.findOne({ category: orderType });
                if (baseService && baseService.pricing[vehicleType]) {
                        totalAmount = baseService.pricing[vehicleType].basePrice;
                    // + distance * pricePerKm (à calculer)
                }
            }

            const orderData = {
                customerId: req.user.id,
                orderType,
                description,
                pickupLocation,
                deliveryLocation,
                totalAmount,
                vehicleType,
                merchantId,
                items: items || []
            };

            const order = new Order(orderData);
            await order.save();

            // Ajouter au statut history
            order.statusHistory.push({
                status: ORDER_STATUS.PENDING,
                updatedBy: req.user.id
            });
            await order.save();

            res.status(201).json({
                message: 'Commande créée avec succès',
                order
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la création de la commande' });
        }
    },

    getMyOrders: async (req, res) => {
        try {
            let query = {};
            
            // Selon le rôle, récupérer les bonnes commandes
            switch (req.user.role) {
                case 'user':
                case 'merchant':
                    query.customerId = req.user.id;
                    break;
                case 'deliverer':
                    query.delivererId = req.user.id;
                    break;
            }

            // Si c'est un marchand, récupérer aussi les commandes de son entreprise
            if (req.user.role === 'merchant') {
            query = {
                $or: [
                    { customerId: req.user.id },
                    { merchantId: req.user.id }
                ]
            };
            }

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
    },
    updateOrderStatus: async (req, res) => {
        try {
            const { orderId } = req.params;
            const { status, notes } = req.body;

            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Commande non trouvée' });
            }

            // Vérifier les permissions
            const canUpdate = 
                req.user.role === 'admin' ||
                (req.user.role === 'deliverer' && order.delivererId?.toString() === req.user.id) ||
                (req.user.role === 'merchant' && order.merchantId?.toString() === req.user.id);

            if (!canUpdate) {
                return res.status(403).json({ message: 'Permission refusée' });
            }

            // Mettre à jour le statut
            order.status = status;
            order.statusHistory.push({
                status,
                updatedBy: req.user.id
            });

            // Ajouter les notes selon le rôle
            if (req.user.role === 'deliverer' && notes) {
                order.delivererNotes = notes;
            } else if (req.user.role === 'admin' && notes) {
                order.adminNotes = notes;
            }

            await order.save();

            res.json({
                message: 'Statut mis à jour avec succès',
                order
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de la mise à jour' });
        }
    }
});

module.exports = orderController;