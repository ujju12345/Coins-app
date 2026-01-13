import React, { useState } from 'react';
import { Search, Filter, Download, Plus, MoreVertical, Eye, Edit, Trash2, User } from 'lucide-react';
import Layout from '../../components/layout/Layout';

interface HealthProfile {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    bloodGroup: string;
    height: string;
    weight: string;
    lastUpdated: string;
    status: 'Complete' | 'Incomplete' | 'Pending';
    conditions: string[];
}

const HealthProfiles: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    // Mock data - Replace with API call
    const healthProfiles: HealthProfile[] = [
        {
            id: '1',
            userId: '1',
            userName: 'Rajesh Kumar',
            age: 45,
            gender: 'Male',
            bloodGroup: 'O+',
            height: '5\'8"',
            weight: '75 kg',
            lastUpdated: '15 Jan 2024',
            status: 'Complete',
            conditions: ['Diabetes', 'Hypertension'],
        },
        {
            id: '2',
            userId: '2',
            userName: 'Priya Sharma',
            age: 32,
            gender: 'Female',
            bloodGroup: 'A+',
            height: '5\'4"',
            weight: '60 kg',
            lastUpdated: '14 Jan 2024',
            status: 'Complete',
            conditions: [],
        },
        {
            id: '3',
            userId: '3',
            userName: 'Amit Patel',
            age: 38,
            gender: 'Male',
            bloodGroup: 'B+',
            height: '5\'10"',
            weight: '82 kg',
            lastUpdated: '12 Jan 2024',
            status: 'Incomplete',
            conditions: ['Asthma'],
        },
        {
            id: '4',
            userId: '4',
            userName: 'Sneha Reddy',
            age: 28,
            gender: 'Female',
            bloodGroup: 'AB+',
            height: '5\'5"',
            weight: '58 kg',
            lastUpdated: '10 Jan 2024',
            status: 'Complete',
            conditions: [],
        },
        {
            id: '5',
            userId: '5',
            userName: 'Vikram Singh',
            age: 52,
            gender: 'Male',
            bloodGroup: 'O-',
            height: '5\'9"',
            weight: '78 kg',
            lastUpdated: '08 Jan 2024',
            status: 'Pending',
            conditions: ['Heart Disease'],
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Complete':
                return 'bg-green-100 text-green-800';
            case 'Incomplete':
                return 'bg-yellow-100 text-yellow-800';
            case 'Pending':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredProfiles = healthProfiles.filter(profile => {
        const matchesSearch = profile.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            profile.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || profile.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <Layout>
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Health Profiles</h1>
                    <p className="text-gray-600">View and manage health information for all registered users</p>
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
                                    placeholder="Search by name or blood group..."
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
                                <option value="Complete">Complete</option>
                                <option value="Incomplete">Incomplete</option>
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
                                <span>Add Profile</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Health Profiles Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Age
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gender
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Blood Group
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Height
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Weight
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Conditions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Updated
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProfiles.map((profile) => (
                                    <tr key={profile.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800">
                                                    <User size={20} />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{profile.userName}</div>
                                                    <div className="text-sm text-gray-500">ID: {profile.userId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {profile.age} yrs
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {profile.gender}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                {profile.bloodGroup}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {profile.height}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {profile.weight}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {profile.conditions.length > 0 ? (
                                                    <span className="text-orange-600">{profile.conditions.join(', ')}</span>
                                                ) : (
                                                    <span className="text-gray-400">None</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(profile.status)}`}>
                                                {profile.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {profile.lastUpdated}
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
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredProfiles.length}</span> of{' '}
                            <span className="font-medium">{healthProfiles.length}</span> results
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

export default HealthProfiles;
