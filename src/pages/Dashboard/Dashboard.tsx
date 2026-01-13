import React from 'react';
import { ShoppingCart, Truck, Store, Coins, Lightbulb, Package, Users, CheckCircle } from 'lucide-react';
import Layout from '../../components/layout/Layout';
import StatsCard from '../../components/dashboard/StatsCard';

const Dashboard: React.FC = () => {
    const pendingActions = [
        { icon: ShoppingCart, title: 'Orders to approve', value: 8, bgColor: 'bg-green-50' },
        { icon: Truck, title: 'Dispatches to verify', value: 3, bgColor: 'bg-white' },
        { icon: Store, title: 'Retailers to approve', value: 5, bgColor: 'bg-white' },
        { icon: Coins, title: 'Coins awaiting approval', value: 12, bgColor: 'bg-white' },
    ];

    const pipelineStats = [
        { icon: Lightbulb, title: 'Order pending approval', value: 47, subtitle: '6 urgent (>24h)', color: 'text-yellow-600' },
        { icon: Truck, title: 'Dispatches Pending', value: 23, subtitle: 'Est. delivery today', color: 'text-blue-600' },
        { icon: Users, title: 'Retailers Pending', value: 156, subtitle: 'verification required', color: 'text-purple-600' },
        { icon: CheckCircle, title: 'Complaints Responded', value: 12, subtitle: 'avg. resolution: 4.2 days', color: 'text-green-600' },
        { icon: Package, title: 'Tax Challan Pending', value: 8, subtitle: 'Rs 350k due', color: 'text-pink-600' },
    ];

    return (
        <Layout>
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Command Center Dashboard</h1>
                    <p className="text-gray-600">Welcome back, Admin. Here's what needs your attention.</p>
                </div>

                {/* My Pending Actions */}
                <div className="mb-8">
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg">
                                <Package size={20} className="text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">My Pending Actions</h3>
                                <p className="text-sm text-gray-600">Tasks specifically assigned to you based on role and region.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {pendingActions.map((action, index) => (
                            <StatsCard
                                key={index}
                                icon={action.icon}
                                title={action.title}
                                value={action.value}
                                bgColor={action.bgColor}
                            />
                        ))}
                    </div>
                </div>

                {/* Pipeline Backlog Overview */}
                <div className="mb-8">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Package size={20} className="text-gray-700" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Pipeline Backlog Overview</h3>
                            <p className="text-sm text-gray-600">Total pending items across the entire system.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {pipelineStats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className={`p-2 rounded-lg inline-block mb-3 ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-sm text-gray-600 mb-2">{stat.title}</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-xs text-gray-500">{stat.subtitle}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coin Flow Chart Placeholder */}
                <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Coin Flow</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">12 Months</button>
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">6 Months</button>
                            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">30 Days</button>
                        </div>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Chart visualization will be displayed here</p>
                    </div>
                </div>

                {/* Top Coin-Earning Modalities */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-4">Top Coin-Earning Modalities</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Order Intake', value: 60, color: 'bg-yellow-400' },
                            { name: 'Receipt Posting', value: 45, color: 'bg-blue-500' },
                            { name: 'Retailer Visit', value: 35, color: 'bg-green-500' },
                            { name: 'Health Profile', value: 25, color: 'bg-purple-500' },
                            { name: 'Referral', value: 20, color: 'bg-pink-400' },
                            { name: 'Complaints', value: 10, color: 'bg-red-400' },
                        ].map((item, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-gray-700">{item.name}</span>
                                    <span className="text-sm font-medium text-gray-900">{item.value}k</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`${item.color} h-2 rounded-full`}
                                        style={{ width: `${item.value}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
