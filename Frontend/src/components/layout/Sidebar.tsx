// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   Home, 
//   Package, 
//   Plus, 
//   Users, 
//   Settings, 
//   ShoppingBag,
//   Truck,
//   BarChart3,
//   FileText
// } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//   const { user } = useAuth();

//   const getNavItems = () => {
//     const baseItems = [
//       { to: '/', icon: Home, label: 'Dashboard' },
//       { to: '/orders', icon: Package, label: 'Orders' },
//     ];

//     switch (user?.role) {
//       case 'admin':
//         return [
//           ...baseItems,
//           { to: '/admin/users', icon: Users, label: 'Users' },
//           { to: '/admin/orders', icon: FileText, label: 'All Orders' },
//           { to: '/services', icon: ShoppingBag, label: 'Services' },
//           { to: '/settings', icon: Settings, label: 'Settings' },
//         ];
      
//       case 'merchant':
//         return [
//           ...baseItems,
//           { to: '/merchant/services', icon: ShoppingBag, label: 'My Services' },
//           { to: '/merchant/create-service', icon: Plus, label: 'Create Service' },
//           { to: '/settings', icon: Settings, label: 'Settings' },
//         ];
      
//       case 'deliverer':
//         return [
//           ...baseItems,
//           { to: '/deliveries', icon: Truck, label: 'Deliveries' },
//           { to: '/settings', icon: Settings, label: 'Settings' },
//         ];
      
//       default: // user
//         return [
//           ...baseItems,
//           { to: '/create-order', icon: Plus, label: 'New Order' },
//           { to: '/services', icon: ShoppingBag, label: 'Services' },
//           { to: '/settings', icon: Settings, label: 'Settings' },
//         ];
//     }
//   };

//   const navItems = getNavItems();

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//       `}>
//         <div className="flex flex-col h-full">
//           <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
//             <div className="flex items-center flex-shrink-0 px-4">
//               <h2 className="text-lg font-semibold text-gray-800">DeliveryApp</h2>
//             </div>
//             <nav className="mt-5 flex-1 px-2 space-y-1">
//               {navItems.map(({ to, icon: Icon, label }) => (
//                 <NavLink
//                   key={to}
//                   to={to}
//                   onClick={onClose}
//                   className={({ isActive }) =>
//                     `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
//                       isActive
//                         ? 'bg-teal-100 text-teal-900'
//                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                     }`
//                   }
//                 >
//                   <Icon className="mr-3 h-5 w-5" />
//                   {label}
//                 </NavLink>
//               ))}
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Plus, 
  Users, 
  Settings, 
  ShoppingBag,
  Truck,
  BarChart3,
  FileText,
  Quote
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const deliveryQuotes = [
    "Excellence in delivery, every single time.",
    "Your package, our priority.",
    "Connecting people through seamless delivery.",
    "Speed meets reliability in every mile.",
    "Delivering dreams, one package at a time.",
    "Where logistics meets innovation.",
    "Your trust, our commitment to deliver.",
    "Making distance disappear, one delivery at a time."
  ];

  useEffect(() => {
    const currentQuote = deliveryQuotes[currentQuoteIndex];
    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentQuote.length) {
        setDisplayedText(currentQuote.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        
        // Wait 5 seconds before starting next quote
        setTimeout(() => {
          setCurrentQuoteIndex((prev) => (prev + 1) % deliveryQuotes.length);
        }, 5000);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentQuoteIndex]);

  const getNavItems = () => {
    const baseItems = [
      { to: '/', icon: Home, label: 'Dashboard' },
      { to: '/orders', icon: Package, label: 'Orders' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { to: '/admin/users', icon: Users, label: 'Users' },
          { to: '/admin/orders', icon: FileText, label: 'All Orders' },
          { to: '/services', icon: ShoppingBag, label: 'Services' },
          { to: '/settings', icon: Settings, label: 'Settings' },
        ];
      
      case 'merchant':
        return [
          ...baseItems,
          { to: '/merchant/services', icon: ShoppingBag, label: 'My Services' },
          { to: '/merchant/create-service', icon: Plus, label: 'Create Service' },
          { to: '/settings', icon: Settings, label: 'Settings' },
        ];
      
      case 'deliverer':
        return [
          ...baseItems,
          { to: '/deliveries', icon: Truck, label: 'Deliveries' },
          { to: '/settings', icon: Settings, label: 'Settings' },
        ];
      
      default: // user
        return [
          ...baseItems,
          // { to: '/create-order', icon: Plus, label: 'New Order' },
          { to: '/services', icon: ShoppingBag, label: 'Services' },
          { to: '/settings', icon: Settings, label: 'Settings' },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 w-72 bg-white/95 backdrop-blur-xl border-r border-gray-200/50 transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center h-20 px-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-600 to-emerald-600 bg-clip-text text-transparent">DeliveryApp</h2>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-4 pt-6 pb-4 overflow-y-auto">
            <nav className="space-y-2">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-500 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-200/50">
             <div className="bg-gradient-to-br from-gray-50 via-emerald-50 to-pink-50 rounded-xl p-4 border border-emerald-100/50 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Quote className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-600 mb-1">Daily Inspiration</div>
                  <p className="text-sm text-gray-700 leading-relaxed min-h-[2.5rem] flex items-center">
                    {displayedText}
                    {isTyping && (
                      <span className="inline-block w-0.5 h-4 bg-gray-500 ml-1 animate-pulse"></span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;