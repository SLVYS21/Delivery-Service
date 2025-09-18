// import React, { useState } from 'react';
// import { Bell, Menu, User, LogOut, Settings } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
// import Button from '../common/Button';

// interface HeaderProps {
//   onMenuClick: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
//   const { user, logout } = useAuth();
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const getRoleColor = (role: string) => {
//     switch (role) {
//       case 'admin': return 'bg-purple-100 text-purple-800';
//       case 'merchant': return 'bg-blue-100 text-blue-800';
//       case 'deliverer': return 'bg-green-100 text-green-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <button
//               onClick={onMenuClick}
//               className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//             <div className="flex-shrink-0 ml-2 lg:ml-0">
//               <h1 className="text-xl font-bold text-teal-600">DeliveryApp</h1>
//             </div>
//           </div>

//           <div className="flex items-center space-x-4">
//             <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
//               <Bell className="h-5 w-5" />
//             </button>

//             <div className="relative">
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <div className="h-8 w-8 bg-teal-100 rounded-full flex items-center justify-center">
//                   <User className="h-4 w-4 text-teal-600" />
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <div className="text-sm font-medium text-gray-900">{user?.name}</div>
//                   <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(user?.role || '')}`}>
//                     {user?.role}
//                   </span>
//                 </div>
//               </button>

//               {showUserMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                   <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
//                     <Settings className="h-4 w-4 mr-2" />
//                     Settings
//                   </button>
//                   <button
//                     onClick={logout}
//                     className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
//                   >
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, User, LogOut, Settings, UserCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'merchant': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'deliverer': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 ml-2 lg:ml-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-600 to-emerald-600 bg-clip-text text-transparent">
                DeliveryApp
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-900">New order received</p>
                          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm text-gray-900">Delivery completed</p>
                          <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
              >
                <div className="w-9 h-9 bg-gradient-to-r from-gray-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getRoleColor(user?.role || '')}`}>
                    {user?.role}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                      <UserCircle className="h-4 w-4 text-gray-500" />
                      <span>Edit profile</span>
                    </button>
                    
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                      <Settings className="h-4 w-4 text-gray-500" />
                      <span>Account settings</span>
                    </button>
                    
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <span>Support</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-150"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;