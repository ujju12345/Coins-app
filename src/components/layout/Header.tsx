import React from 'react';
import { Search, Calendar, Bell, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white border-b px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Type to search"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Date Range */}
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
                        <Calendar size={18} className="text-gray-600" />
                        <span className="text-sm text-gray-700">Jan 25 - Dec 25</span>
                    </div>

                    {/* Notifications */}
                    <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Avatar */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <Users size={20} className="text-gray-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
