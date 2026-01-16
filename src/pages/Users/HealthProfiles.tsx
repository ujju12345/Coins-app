"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, MoreVertical, X, Calendar, AlertTriangle, Heart, TrendingUp, Award, Shield, UserCheck, CheckCircle, AlertCircle, Clock } from "lucide-react";
import Layout from "../../components/layout/Layout";

// Health Profile Interface
interface HealthProfile {
  id: string;
  name: string;
  username: string;
  role: string;
  healthStatus: "Healthy" | "Needs Attention" | "Not Set";
  city: string;
  healthProfileStatus: "Active" | "Incomplete" | "Flagged";
  healthCoins: number;
  lastSync: string;
  distributor: string;
  // Detailed health info
  age?: number;
  gender?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  avgHeartRate?: number;
  avgCardioVO2?: number;
  bmi?: number;
  sportFrequency?: string;
  lastSport?: string;
  coinEarnedToday?: number;
  coinEarnedMonth?: number;
  lastCoinEarned?: string;
  flags?: string[];
  occupation?: string;
  institution?: string;
}

export default function HealthProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHealthStatus, setSelectedHealthStatus] = useState("all");
  const [selectedProfileStatus, setSelectedProfileStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState<HealthProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  // Health Profiles data
  const healthProfiles: HealthProfile[] = [
    {
      id: "ML-RTL-2034",
      name: "Olivia Rhye",
      username: "@olivia",
      role: "Retailer",
      healthStatus: "Healthy",
      city: "Lahore",
      healthProfileStatus: "Active",
      healthCoins: 320,
      lastSync: "Today",
      distributor: "Shadab Enterprises",
      age: 28,
      gender: "Female",
      bloodGroup: "O+",
      emergencyContact: "+44777777",
      avgHeartRate: 15200,
      avgCardioVO2: 3800,
      bmi: 19.2,
      sportFrequency: "Multiple times daily",
      lastSport: "12 days ago",
      coinEarnedToday: 0,
      coinEarnedMonth: 950,
      lastCoinEarned: "12 days ago",
      flags: ["Rapid Type Advance", "Manual Data Spikes"],
      occupation: "Tailor",
      institution: "Khan Industries"
    },
    {
      id: "ML-RTL-2098",
      name: "Phoenix Baker",
      username: "@phoenix",
      role: "Retailer",
      healthStatus: "Not Set",
      city: "Karachi",
      healthProfileStatus: "Incomplete",
      healthCoins: 0,
      lastSync: "—",
      distributor: "Khan Industries"
    },
    {
      id: "ML-RTL-2145",
      name: "Lana Steiner",
      username: "@lana",
      role: "Retailer",
      healthStatus: "Needs Attention",
      city: "Faisalabad",
      healthProfileStatus: "Flagged",
      healthCoins: 90,
      lastSync: "12 days ago",
      distributor: "Khan Industries",
      age: 32,
      gender: "Female",
      bloodGroup: "A+",
      emergencyContact: "+4412345678",
      avgHeartRate: 14200,
      avgCardioVO2: 3200,
      bmi: 22.1,
      sportFrequency: "Weekly",
      lastSport: "15 days ago",
      coinEarnedToday: 0,
      coinEarnedMonth: 450,
      lastCoinEarned: "15 days ago",
      flags: ["Irregular Patterns", "Data Gaps"],
      occupation: "Tailor",
      institution: "Khan Industries"
    },
    {
      id: "ML-DST-1001",
      name: "Demi Wilkinson",
      username: "@demi",
      role: "Distributor",
      healthStatus: "Healthy",
      city: "Multan",
      healthProfileStatus: "Active",
      healthCoins: 410,
      lastSync: "Yesterday",
      distributor: "—",
      age: 35,
      gender: "Male",
      bloodGroup: "B+",
      emergencyContact: "+4498765432",
      avgHeartRate: 16500,
      avgCardioVO2: 4200,
      bmi: 21.5,
      sportFrequency: "Daily",
      lastSport: "2 days ago",
      coinEarnedToday: 50,
      coinEarnedMonth: 1200,
      lastCoinEarned: "Today"
    },
    {
      id: "ML-RTL-2210",
      name: "Candice Wu",
      username: "@candice",
      role: "Retailer",
      healthStatus: "Healthy",
      city: "Islamabad",
      healthProfileStatus: "Active",
      healthCoins: 280,
      lastSync: "Today",
      distributor: "Shadab Enterprises",
      age: 29,
      gender: "Female",
      bloodGroup: "AB+",
      emergencyContact: "+4455566677",
      avgHeartRate: 14800,
      avgCardioVO2: 3600,
      bmi: 20.8,
      sportFrequency: "3-4 times weekly",
      lastSport: "3 days ago",
      coinEarnedToday: 30,
      coinEarnedMonth: 820,
      lastCoinEarned: "Yesterday"
    },
    {
      id: "ML-RTL-2250",
      name: "Natali Craig",
      username: "@natali",
      role: "Retailer",
      healthStatus: "Healthy",
      city: "Karachi",
      healthProfileStatus: "Active",
      healthCoins: 90,
      lastSync: "Today",
      distributor: "Shadab Enterprises",
      age: 26,
      gender: "Female",
      bloodGroup: "O-",
      emergencyContact: "+4488899900",
      avgHeartRate: 13800,
      avgCardioVO2: 3400,
      bmi: 19.8,
      sportFrequency: "2-3 times weekly",
      lastSport: "5 days ago",
      coinEarnedToday: 20,
      coinEarnedMonth: 680,
      lastCoinEarned: "2 days ago"
    }
  ];

  // Activity History Data
  const recentActivity = [
    { daysAgo: "7 days ago", steps: 23000, calories: 5360, bmi: 19.2, coins: "+100 cents" },
    { daysAgo: "9 days ago", steps: 8500, calories: 4360, bmi: 19.2, coins: "+140 cents" },
    { daysAgo: "14 days ago", steps: 16800, calories: 6200, bmi: 19.2, coins: "+180 cents" }
  ];

  // Filter profiles
  const filteredProfiles = healthProfiles.filter((profile) => {
    const matchesSearch = 
      profile.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesHealthStatus = selectedHealthStatus === "all" || profile.healthStatus === selectedHealthStatus;
    const matchesProfileStatus = selectedProfileStatus === "all" || profile.healthProfileStatus === selectedProfileStatus;

    return matchesSearch && matchesHealthStatus && matchesProfileStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + itemsPerPage);

  // Modal handlers
  const openModal = (profile: HealthProfile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };


    const getHealthStatusIcon = (status: HealthProfile["healthStatus"]) => {
    switch (status) {
      case "Healthy":
        return <CheckCircle size={12} className="mr-1" />;
      case "Needs Attention":
        return <AlertCircle size={12} className="mr-1" />;
      case "Not Set":
        return <Clock size={12} className="mr-1" />;
      default:
        return null;
    }
  };
  // Get health status styles
  const getHealthStatusStyles = (status: HealthProfile["healthStatus"]) => {
    switch (status) {
      case "Healthy":
        return "bg-green-50 text-green-700";
      case "Needs Attention":
        return "bg-yellow-50 text-yellow-700";
      case "Not Set":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  // Get profile status styles
  const getProfileStatusStyles = (status: HealthProfile["healthProfileStatus"]) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700";
      case "Incomplete":
        return "bg-gray-100 text-gray-700";
      case "Flagged":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header Tabs */}
        <div className="border-b border-gray-200 mt-7">
          <div className="max-w-full">
            <div className="flex">
              <button 
                onClick={() => window.location.href = '/Users/UserList'}
                className="px-8 py-4 text-gray-600 flex items-center gap-3 text-base hover:bg-gray-50"
              >
                <span className="text-xl">👥</span> All Users
              </button>
              <button 
                className="px-8 py-4 font-semibold text-gray-900 border-b-2 border-green-600 flex items-center gap-3 text-base"
                onClick={() => window.location.href = '/Users/HealthProfiles'}

              >
                <span className="text-xl">❤️</span> Health Profiles
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Health Profiles
            </h1>
            <p className="text-gray-600 text-sm">
              View members' health-related submissions linked to the wellness rewards program.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-[320px]">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search profiles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>
              
              {/* Health Status Filter */}
              <div className="relative">
                <select
                  value={selectedHealthStatus}
                  onChange={(e) => setSelectedHealthStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[160px] pr-10"
                >
                  <option value="all">All Health Status</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Needs Attention">Needs Attention</option>
                  <option value="Not Set">Not Set</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* Profile Status Filter */}
              <div className="relative">
                <select
                  value={selectedProfileStatus}
                  onChange={(e) => setSelectedProfileStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[160px] pr-10"
                >
                  <option value="all">All Profile Status</option>
                  <option value="Active">Active</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Flagged">Flagged</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            <button
              className="px-5 py-3 text-white rounded-lg hover:opacity-90 font-medium flex items-center gap-2 text-sm"
              style={{ backgroundColor: "rgba(1, 80, 41, 1)" }}
            >
              <Filter size={16} />
              Apply Filters
            </button>
          </div>

          {/* Health Profiles Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Health Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">City/Region</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Health Profile Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Health Coins (MTD)</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Sync</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Distributor</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedProfiles.map((profile) => (
                    <tr
                      key={profile.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {profile.id}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {profile.name.charAt(0)}
                          </div> */}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {profile.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {profile.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {profile.role}
                        </div>
                      </td>

                      {/* Health Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${getHealthStatusStyles(profile.healthStatus)}`}>
                            {getHealthStatusIcon(profile.healthStatus)}
                          {profile.healthStatus}
                        </div>
                      </td>

                      {/* City */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {profile.city}
                        </div>
                      </td>

                      {/* Health Profile Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${getProfileStatusStyles(profile.healthProfileStatus)}`}>
                          {profile.healthProfileStatus}
                        </div>
                      </td>

                      {/* Health Coins */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {profile.healthCoins.toLocaleString()}
                        </div>
                      </td>

                      {/* Last Sync */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {profile.lastSync}
                        </div>
                      </td>

                      {/* Distributor */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {profile.distributor}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openModal(profile)}
                            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                          >
                            <MoreVertical size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results info and Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProfiles.length)}</span> of{" "}
              <span className="font-medium">{filteredProfiles.length}</span> profiles
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded text-sm font-medium ${
                    currentPage === page
                      ? "bg-green-600 text-white border-green-600"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Modal Backdrop */}
        {isModalOpen && selectedProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blur Background */}
            <div 
              className="absolute inset-0 bg-white/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            {/* Health Profile Detail Modal - Enhanced with borders */}
            <div className="relative bg-white rounded-2xl w-full max-w-4xl shadow-2xl">
              <div className="max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">Health Profile Detail</h1>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} />
                        <span>M. 03. 2024 •</span>
                        <span className="font-medium">{selectedProfile.occupation || selectedProfile.role}</span>
                      </div>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Profile Overview - with border */}
                  <div className="mb-8 border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedProfile.name}</h2>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">{selectedProfile.username}</span>
                          <span className="text-sm text-gray-500">01. 06. 03. 21:14</span>
                        </div>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getHealthStatusStyles(selectedProfile.healthStatus)}`}>
                        <UserCheck size={14} className="mr-1" />
                        {getHealthStatusIcon(selectedProfile.healthStatus)}

                        {selectedProfile.healthStatus}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Role:</p>
                        <p className="text-base font-semibold text-gray-900">{selectedProfile.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Institutions:</p>
                        <p className="text-base font-semibold text-gray-900">{selectedProfile.institution || selectedProfile.distributor}</p>
                      </div>
                    </div>

                    {/* Health Status List */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">Health Status:</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">• Head, Wristbone</span>
                      </div>
                    </div>
                  </div>

                  {/* Health Info Section - with border */}
                  <div className="mb-8 border border-gray-200 rounded-xl p-6 bg-white">
                    <div className="flex items-center gap-3 mb-6">
                      <Heart className="text-red-500" size={20} />
                      <h3 className="text-lg font-semibold text-gray-900">Health Info (from wearable)</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Age:</p>
                        <p className="text-base font-medium text-gray-900">{selectedProfile.age || "28"} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Gender:</p>
                        <p className="text-base font-medium text-gray-900">{selectedProfile.gender || "Female"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Blood Group:</p>
                        <p className="text-base font-medium text-gray-900">{selectedProfile.bloodGroup || "O+"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Emergency Contact:</p>
                        <p className="text-base font-medium text-gray-900">{selectedProfile.emergencyContact || "+44777777"}</p>
                        <p className="text-xs text-gray-500 mt-1">(Asked for privacy)</p>
                      </div>
                    </div>
                  </div>

                  {/* Activity Snapshot - with border */}
                  <div className="mb-8 border border-gray-200 rounded-xl p-6 bg-white">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="text-blue-500" size={20} />
                      <h3 className="text-lg font-semibold text-gray-900">Activity Snapshot</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Avg. Heart Rate:</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedProfile.avgHeartRate?.toLocaleString() || "15,200"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Avg. CardioVO2:</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedProfile.avgCardioVO2?.toLocaleString() || "3,800"}</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">BMI:</p>
                          <p className="text-2xl font-bold text-gray-900">{selectedProfile.bmi || "19.2"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Sport / Hobbying:</p>
                          <p className="text-base font-medium text-gray-900">{selectedProfile.sportFrequency || "Multiple times daily"}</p>
                          {selectedProfile.lastSport && (
                            <p className="text-sm text-gray-500 mt-1">Last Sport: {selectedProfile.lastSport}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coin Breakdown - with border */}
                  <div className="mb-8 border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center gap-3 mb-6">
                      <Award className="text-green-600" size={20} />
                      <h3 className="text-lg font-semibold text-gray-900">Coin Breakdown (Health info)</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Coin Earned Today:</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedProfile.coinEarnedToday || "0"} coins</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Coin Earned This Month:</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedProfile.coinEarnedMonth || "950"} coins</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-500 mb-1">Last Coin Earned:</p>
                        <p className="text-base font-medium text-gray-900">{selectedProfile.lastCoinEarned || "12 days ago"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Flags / Alerts - with border */}
                  {selectedProfile.flags && selectedProfile.flags.length > 0 && (
                    <div className="mb-8 border border-yellow-200 rounded-xl p-6 bg-yellow-50">
                      <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="text-yellow-600" size={20} />
                        <h3 className="text-lg font-semibold text-gray-900">Flags / Alerts</h3>
                      </div>
                      <div className="space-y-3">
                        {selectedProfile.flags.map((flag, index) => (
                          <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-yellow-100">
                            <AlertTriangle className="text-yellow-600 mt-0.5" size={18} />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{flag}</p>
                              {flag === "Rapid Type Advance" && (
                                <p className="text-sm text-gray-600 mt-1">Multiple spots within your preferred direction</p>
                              )}
                              {flag === "Manual Data Spikes" && (
                                <p className="text-sm text-gray-600 mt-1">(Request again in manually entered date)</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Activity History - with enhanced border */}
                  <div className="mb-8 border border-blue-100 rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp className="text-blue-600" size={20} />
                      <h3 className="text-lg font-semibold text-gray-900">Recent Activity History</h3>
                    </div>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="border border-blue-200 rounded-lg p-6 bg-white hover:border-blue-300 transition-colors shadow-sm">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-gray-900">{activity.daysAgo}</span>
                            <span className="text-sm font-bold text-green-600">{activity.coins}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Steps</p>
                              <p className="text-lg font-medium text-gray-900">{activity.steps.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Calories</p>
                              <p className="text-lg font-medium text-gray-900">{activity.calories.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">BMI</p>
                              <p className="text-lg font-medium text-gray-900">{activity.bmi}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500 mb-1">TTD cents</p>
                              <p className="text-lg font-bold text-green-600">{activity.coins}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200">
  <h2 className="text-lg font-semibold text-gray-900 mb-5">
    Admin Actions
  </h2>
  <div className="flex flex-wrap gap-3">
    <button className="px-15 py-3 text-sm font-medium text-yellow-700 border border-yellow-300 rounded-lg hover:bg-yellow-50 hover:border-yellow-400 transition-colors flex items-center gap-2">
      <AlertTriangle size={16} />
      Flag Profile
    </button>
    <button className="px-15 py-3 text-sm font-medium text-red-700 border border-red-300 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors flex items-center gap-2">
      <X size={16} />
      Suspend Health Coins
    </button>
    <button className="px-15 py-3 text-sm font-medium text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center gap-2">
      <span>+</span>
      Add Internal Note
    </button>
  </div>
</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}