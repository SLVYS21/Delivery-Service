import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ShoppingBag, Clock, CheckCircle, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // For non-user roles, show the existing dashboard
  if (user?.role !== 'user') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.role === 'admin' ? 'Admin Dashboard' : 
               user?.role === 'merchant' ? 'Merchant Dashboard' : 
               'Deliverer Dashboard'}
            </h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.role === 'admin' && (
            <>
              <Card hover className="text-center">
                <Package className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
                <p className="text-gray-600 mb-4">View and manage all users</p>
                <Link to="/admin/users">
                  <Button variant="outline" size="sm">View Users</Button>
                </Link>
              </Card>
              <Card hover className="text-center">
                <Package className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">All Orders</h3>
                <p className="text-gray-600 mb-4">Monitor all orders</p>
                <Link to="/admin/orders">
                  <Button variant="outline" size="sm">View Orders</Button>
                </Link>
              </Card>
            </>
          )}
          
          {user?.role === 'merchant' && (
            <>
              <Card hover className="text-center">
                <Package className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">My Orders</h3>
                <p className="text-gray-600 mb-4">Manage your orders</p>
                <Link to="/orders">
                  <Button variant="outline" size="sm">View Orders</Button>
                </Link>
              </Card>
            </>
          )}
          
          {user?.role === 'deliverer' && (
            <>
              <Card hover className="text-center">
                <Truck className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">My Deliveries</h3>
                <p className="text-gray-600 mb-4">View assigned deliveries</p>
                <Link to="/deliveries">
                  <Button variant="outline" size="sm">View Deliveries</Button>
                </Link>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  }

  // User dashboard with French design
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Votre solution de livraison rapide et fiable
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Que ce soit pour un colis, un transport ou une course, DeliveryApp s'occupe 
              de tout avec rapidité et professionnalisme. Simplifiez votre quotidien !
            </p>
            <Link to="/create-order">
              <Button className="bg-emerald-600 hover:bg-green-700 text-white px-6 py-3 text-lg">
                Passer une commande
              </Button>
            </Link>
          </div>
          <div className="flex justify-center">
            <img 
              src="images/hero2.jpg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop" 
              alt="Delivery person on motorcycle"
              className="rounded-xl shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="text-center">
        {/* <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
        <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
          Découvrez la gamme complète de services DeliveryApp conçus pour répondre à tous vos 
          besoins logistiques, du petit colis aux transports spécialisés.
        </p> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Livraison Rapide */}
          {/* <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Livraison Rapide</h3>
            <p className="text-gray-600 mb-6">
              Expédiez et recevez vos colis en toute simplicité et à la vitesse de l'éclair, partout où vous en avez besoin.
            </p>
            <Button variant="outline" size="sm">
              Découvrir la Livraison
            </Button>
          </Card> */}

          {/* Transport Adapté */}
          {/* <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Transport Adapté</h3>
            <p className="text-gray-600 mb-6">
              Que ce soit pour des marchandises volumineuses ou spécifiques, choisissez le véhicule idéal pour vos besoins.
            </p>
            <Button variant="outline" size="sm">
              Explorer le Transport
            </Button>
          </Card> */}

          {/* Courses sur Mesure */}
          {/* <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Courses sur Mesure</h3>
            <p className="text-gray-600 mb-6">
              Faites vos courses, trouvez les bonnes Plus de temps libre pour vous, nos nous occupons du reste !
            </p>
            <Button variant="outline" size="sm">
              Faire des Courses
            </Button>
          </Card> */}
        </div>
      </div>

      {/* Merchant Services Section */}
      {/* <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Services Marchands</h2>
            <p className="text-gray-600 text-lg mb-6">
              Optimisez la gestion de vos commandes et livraisons. Rejoignez LivreurExpress 
              pour une efficacité accrue et un suivi transparent de chaque envoi.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
              Devenir Partenaire Marchand
            </Button>
          </div>
          <div className="flex justify-center">
            <img 
              src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop" 
              alt="Merchant with packages"
              className="rounded-xl shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div> */}

      {/* How it Works Section */}
      {/* <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça Marche ?</h2>
        <p className="text-gray-600 text-lg mb-12">
          Découvrez les trois étapes simples pour utiliser LivreurExpress et profiter de nos services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">1. Commander Facilement</h3>
            <p className="text-gray-600">
              Sélectionnez votre service et remplissez les détails en quelques clics. C'est simple et rapide !
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">2. Suivi en Temps Réel</h3>
            <p className="text-gray-600">
              Suivez votre livraison du départ à l'arrivée. Restez informé à chaque étape du processus.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">3. Livraison Sécurisée</h3>
            <p className="text-gray-600">
              Votre commande est livrée en toute sécurité à destination, par des professionnels fiables.
            </p>
          </div>
        </div>
      </div> */}

      {/* Testimonials Section */}
      {/* <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce qu'ils disent de nous</h2>
        <p className="text-gray-600 text-lg mb-12">
          Des clients satisfaits témoignent de la qualité et de la fiabilité de nos services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-6">
              "LivreurExpress a révolutionné nos livraisons. Rapidité et professionnalisme 
              sont toujours au rendez-vous. Un service impeccable !"
            </p>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" 
                alt="Sophie Dupont"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">Sophie Dupont</p>
                <p className="text-gray-600 text-sm">Gérante de Boutique</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-6">
              "J'utilise LivreurExpress pour toutes mes courses, c'est un gain de temps 
              incroyable. Leurs livreurs sont toujours efficaces et aimables."
            </p>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" 
                alt="Marc Lefèvre"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">Marc Lefèvre</p>
                <p className="text-gray-600 text-sm">Particulier</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600 italic mb-6">
              "En tant que marchand, la notification de commande prête est un atout majeur. 
              Cela optimise notre flux et satisfait nos clients."
            </p>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face" 
                alt="Fatima Zahra"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">Fatima Zahra</p>
                <p className="text-gray-600 text-sm">Propriétaire de Restaurant</p>
              </div>
            </div>
          </Card>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;