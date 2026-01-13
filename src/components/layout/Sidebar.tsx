import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Users, UserCheck, ShoppingCart, FileCheck, Package,
    Truck, MapPin, Coins, TrendingUp, RefreshCw, AlertCircle, Gift,
    CreditCard, Receipt, FileText, Receipt as Tax, MessageSquare,
    Bell, LogOut, ChevronDown, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import leafLogo from '../../assets/leaf.png';

interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    path?: string;
    children?: MenuItem[];
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [expandedMenus, setExpandedMenus] = useState<string[]>(['users', 'orders']);

    const menuItems: MenuItem[] = [
        {
            id: 'overview',
            label: 'OVERVIEW',
            icon: <LayoutDashboard size={20} />,
            children: [
                { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' }
            ]
        },
        {
            id: 'users',
            label: 'USERS & PROFILE',
            icon: <Users size={20} />,
            children: [
                { id: 'all-users', label: 'All Users', icon: <Users size={18} />, path: '/users' },
                { id: 'health-profiles', label: 'Health Profiles', icon: <UserCheck size={18} />, path: '/health-profiles' }
            ]
        },
        {
            id: 'orders',
            label: 'ORDERS & SUPPLY',
            icon: <ShoppingCart size={20} />,
            children: [
             //   { id: 'orders', label: 'Orders', icon: <ShoppingCart size={18} />, path: '/orders' },
                { id: 'pending-approval', label: 'Pending Approval', icon: <FileCheck size={18} />, path: '/orders/OrderPending' },
                { id: 'all-orders', label: 'All Orders', icon: <Package size={18} />, path: '/orders/AllOrders' },
                { id: 'order-history', label: 'Order History', icon: <FileText size={18} />, path: '/orders/OrderHistory' }
            ]
        },
        {
            id: 'dispatches',
            label: 'Dispatches',
            icon: <Truck size={20} />,
            children: [
                { id: 'dispatch-queue', label: 'Dispatch Queue', icon: <Truck size={18} />, path: '/dispatches/DispatchQueue' },
                { id: 'tracking', label: 'Tracking', icon: <MapPin size={18} />, path: '/dispatches/tracking' }
            ]
        },
        {
            id: 'retail',
            label: 'RETAIL & DISTRIBUTION',
            icon: <Package size={20} />,
            children: [
                { id: 'retailers', label: 'Retailers', icon: <Package size={18} />, path: '/retailers' },
                { id: 'pending-verification', label: 'Pending Verification', icon: <FileCheck size={18} />, path: '/retailers/pending' },
                { id: 'distribution-lines', label: 'Distribution Lines', icon: <MapPin size={18} />, path: '/distribution' }
            ]
        },
        {
            id: 'coins',
            label: 'COINS & REWARDS',
            icon: <Coins size={20} />,
            children: [
                { id: 'coins', label: 'Coins', icon: <Coins size={18} />, path: '/coins' },
                { id: 'in-process', label: 'In Process', icon: <TrendingUp size={18} />, path: '/coins/process' },
                { id: 'coin-ledger', label: 'Coin Ledger', icon: <FileText size={18} />, path: '/coins/ledger' },
                { id: 'burn-alerts', label: 'Burn Alerts', icon: <AlertCircle size={18} />, path: '/coins/alerts' }
            ]
        },
        {
            id: 'rewards',
            label: 'Rewards',
            icon: <Gift size={20} />,
            children: [
                { id: 'redemption', label: 'Redemption', icon: <RefreshCw size={18} />, path: '/rewards/redemption' },
                { id: 'lottery', label: 'Lottery', icon: <Gift size={18} />, path: '/rewards/lottery' }
            ]
        },
        {
            id: 'finance',
            label: 'FINANCE',
            icon: <CreditCard size={20} />,
            children: [
                { id: 'payments', label: 'Payments', icon: <CreditCard size={18} />, path: '/payments' },
                { id: 'receipt-posting', label: 'Receipt Posting', icon: <Receipt size={18} />, path: '/payments/receipts' },
                { id: 'ledger-signoff', label: 'Ledger Signoff', icon: <FileText size={18} />, path: '/payments/ledger' }
            ]
        },
        {
            id: 'tax',
            label: 'Tax',
            icon: <Tax size={20} />,
            children: [
                { id: 'challans', label: 'Challans', icon: <FileText size={18} />, path: '/tax/challans' }
            ]
        },
        {
            id: 'engagement',
            label: 'ENGAGEMENT & SUPPORT',
            icon: <MessageSquare size={20} />,
            children: [
                { id: 'complaints', label: 'Complaints', icon: <MessageSquare size={18} />, path: '/complaints' },
                { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, path: '/notifications' }
            ]
        }
    ];

    const toggleMenu = (menuId: string) => {
        setExpandedMenus(prev =>
            prev.includes(menuId)
                ? prev.filter(id => id !== menuId)
                : [...prev, menuId]
        );
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const isActive = (path?: string) => {
        return path && location.pathname === path;
    };

    return (
        <div className="w-64 bg-white h-screen flex flex-col shadow-lg overflow-y-auto">
            {/* Logo */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <img src={leafLogo} alt="Logo" className="w-8 h-8" />
                    <span className="font-bold text-gray-900">Mkopla Coin Admin</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-4">
                {menuItems.map((menu) => (
                    <div key={menu.id} className="mb-2">
                        {menu.children ? (
                            <>
                                <button
                                    onClick={() => toggleMenu(menu.id)}
                                    className="w-full px-4 py-2 flex items-center justify-between text-xs font-semibold text-gray-500 hover:bg-gray-50"
                                >
                                    <span>{menu.label}</span>
                                    {expandedMenus.includes(menu.id) ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    )}
                                </button>
                                {expandedMenus.includes(menu.id) && (
                                    <div className="ml-2">
                                        {menu.children.map((child) => (
                                            <button
                                                key={child.id}
                                                onClick={() => child.path && handleNavigation(child.path)}
                                                className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${isActive(child.path)
                                                        ? 'bg-green-800 text-white font-medium'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {child.icon}
                                                <span>{child.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={() => menu.path && handleNavigation(menu.path)}
                                className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm ${isActive(menu.path)
                                        ? 'bg-green-800 text-white'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {menu.icon}
                                <span>{menu.label}</span>
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* User Profile */}
            <div className="border-t p-4">
                <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-500 mb-2">MY PROFILE</p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <Users size={20} className="text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <LogOut size={18} />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
