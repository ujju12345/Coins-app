import React, { useState } from 'react';
import { Search, Filter, Download, Plus, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import Layout from '../../components/layout/Layout';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    status: 'Active' | 'Inactive' | 'Pending';
    registeredDate: string;
    totalOrders: number;
    totalCoins: number;
}

const UserList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    // Mock data - Replace with API call
    const users: User[] = [
        {
            id: '1',
            name: 'Rajesh Kumar',
            email: 'rajesh.k@example.com',
            phone: '+91 98765 43210',
            location: 'Mumbai',
            status: 'Active',
            registeredDate: '15 Jan 2024',
            totalOrders: 45,
            totalCoins: 2500,
        },
        {
            id: '2',
            name: 'Priya Sharma',
            email: 'priya.s@example.com',
            phone: '+91 98765 43211',
            location: 'Delhi',
            status: 'Active',
            registeredDate: '12 Jan 2024',
            totalOrders: 32,
            totalCoins: 1800,
        },
        {
            id: '3',
            name: 'Amit Patel',
            email: 'amit.p@example.com',
            phone: '+91 98765 43212',
            location: 'Bangalore',
            status: 'Inactive',
            registeredDate: '10 Jan 2024',
            totalOrders: 28,
            totalCoins: 1500,
        },
        {
            id: '4',
            name: 'Sneha Reddy',
            email: 'sneha.r@example.com',
            phone: '+91 98765 43213',
            location: 'Hyderabad',
            status: 'Active',
            registeredDate: '08 Jan 2024',
            totalOrders: 51,
            totalCoins: 3200,
        },
        {
            id: '5',
            name: 'Vikram Singh',
            email: 'vikram.s@example.com',
            phone: '+91 98765 43214',
            location: 'Chennai',
            status: 'Pending',
            registeredDate: '05 Jan 2024',
            totalOrders: 15,
            totalCoins: 800,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-red-100 text-red-800';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.phone.includes(searchQuery);
        const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <Layout>
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">All Users</h1>
                    <p className="text-gray-600">Manage and monitor all registered users in the system</p>
                </div>

                {/* Filters and Actions */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="flex-1 w-full md:max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                                />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex gap-2 w-full md:w-auto">
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                            </select>

                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                <Filter size={18} />
                                <span>More Filters</span>
                            </button>

                            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                                <Download size={18} />
                                <span>Export</span>
                            </button>

                            <button className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-900 flex items-center gap-2">
                                <Plus size={18} />
                                <span>Add User</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registered
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Orders
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Coins
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-semibold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.registeredDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.totalOrders}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-800">
                                            {user.totalCoins.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <button className="p-1 hover:bg-gray-100 rounded" title="View">
                                                    <Eye size={16} className="text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
                                                    <Edit size={16} className="text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="Delete">
                                                    <Trash2 size={16} className="text-red-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded" title="More">
                                                    <MoreVertical size={16} className="text-gray-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span> of{' '}
                            <span className="font-medium">{users.length}</span> results
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                                Previous
                            </button>
                            <button className="px-3 py-1 bg-green-800 text-white rounded hover:bg-green-900 text-sm">
                                1
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                                2
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                                3
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserList;
