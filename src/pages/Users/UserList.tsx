"use client";

import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, MoreVertical, X, Phone, Mail, MapPin, Calendar, Briefcase, Users, Package, FileText, BarChart3, Activity, CheckCircle, Clock, Ban, Shield, Edit, Eye, Delete, DeleteIcon } from "lucide-react";
import Layout from "../../components/layout/Layout";

// User Interface
interface User {
  id: string;
  name: string;
  username: string;
  role: "Distributor" | "Retailer";
  city: string;
  status: "Active" | "Pending Verification" | "Blocked";
  email: string;
  coinBalance: number;
  healthProfile: "Active" | "Not Started" | "Flagged";
  joinedOn: string;
  lastActivity: string;
  phone?: string;
  distributionLines?: string;
  connectedRetailers?: number;
  ledgerStatus?: string;
  totalVolume?: string;
  products?: { name: string; description: string }[];
}

type ModalType = "view" | "edit" | "activate" | "activity" | null;

export default function UserList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const itemsPerPage = 6;

  // Users data
  const users: User[] = [
    {
      id: "ML-DST-1001",
      name: "Olivia Rhyne",
      username: "@olivia",
      role: "Distributor",
      city: "Lahore",
      status: "Active",
      email: "olivia@untitledul.com",
      coinBalance: 12450,
      healthProfile: "Not Started",
      joinedOn: "12 Jan 2024",
      lastActivity: "2 hrs ago",
      phone: "+92 300 1122334",
      distributionLines: "Line A – North Lahore, Line B – Central Lahore",
      connectedRetailers: 18,
      ledgerStatus: "Pending (1 sign-off)",
      totalVolume: "1,250 Tons",
      products: [
        { name: "Maple Cement OPC", description: "Premium Quality" },
        { name: "Maple Cement SRC", description: "Sulfate Resistant" }
      ]
    },
    {
      id: "ML-RTL-2034",
      name: "Phoenix Baker",
      username: "@phoenix",
      role: "Retailer",
      city: "Karachi",
      status: "Pending Verification",
      email: "phoenix@untitledul.com",
      coinBalance: 4520,
      healthProfile: "Active",
      joinedOn: "18 Feb 2024",
      lastActivity: "5 mins ago"
    },
    {
      id: "ML-RTL-2098",
      name: "Lana Steiner",
      username: "@lana",
      role: "Retailer",
      city: "Faisalabad",
      status: "Active",
      email: "lana@untitledul.com",
      coinBalance: 1200,
      healthProfile: "Not Started",
      joinedOn: "02 Mar 2024",
      lastActivity: "Just now"
    },
    {
      id: "ML-DST-1004",
      name: "Demi Wilkinson",
      username: "@demi",
      role: "Distributor",
      city: "Multan",
      status: "Active",
      email: "demi@untitledul.com",
      coinBalance: 9800,
      healthProfile: "Active",
      joinedOn: "05 Jan 2024",
      lastActivity: "15 mins ago",
      distributionLines: "Line A – Multan Central",
      connectedRetailers: 12,
      ledgerStatus: "Approved",
      totalVolume: "850 Tons"
    },
    {
      id: "ML-RTL-2145",
      name: "Candice Wu",
      username: "@candice",
      role: "Retailer",
      city: "Islamabad",
      status: "Blocked",
      email: "candice@untitledul.com",
      coinBalance: 0,
      healthProfile: "Flagged",
      joinedOn: "10 Feb 2024",
      lastActivity: "12 days ago"
    },
    {
      id: "ML-RTL-2210",
      name: "Natali Craig",
      username: "@natali",
      role: "Retailer",
      city: "Karachi",
      status: "Active",
      email: "natali@untitledul.com",
      coinBalance: 7340,
      healthProfile: "Active",
      joinedOn: "28 Feb 2024",
      lastActivity: "30 mins ago"
    }
  ];

  const Info = ({ label, value, bold = false }: any) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-sm ${bold ? "font-semibold" : "font-medium"} text-gray-900`}>
      {value || "-"}
    </p>
  </div>
);

  // Activity data
  const activityData = [
    { date: "31 Dec 2024, 10:30 AM", action: "Order placed", details: "Order #ORD-4521 - 50 bags OPC Cement" },
    { date: "30 Dec 2024, 03:15 PM", action: "Coins earned", details: "+250 coins from order completion" },
    { date: "29 Dec 2024, 11:45 AM", action: "Profile updated", details: "Contact information updated" },
    { date: "28 Dec 2024, 09:20 AM", action: "Tax challan uploaded", details: "Challan #CH-1234 submitted" },
    { date: "27 Dec 2024, 02:00 PM", action: "Location updated", details: "Shop location verified" }
  ];

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    const matchesCity = selectedCity === "all" || user.city === selectedCity;

    return matchesSearch && matchesRole && matchesStatus && matchesCity;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Modal handlers
  const openModal = (type: ModalType, user: User) => {
    setSelectedUser(user);
    setModalType(type);
    setEditedUser({ ...user });
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
    setEditedUser({});
  };

  const handleSaveEdit = () => {
    console.log("Saving user:", editedUser);
    closeModal();
  };

  const handleActivateUser = () => {
    console.log("Activating user:", selectedUser?.id);
    closeModal();
  };

  // Format coin balance
  const formatCoinBalance = (balance: number) => {
    return balance.toLocaleString();
  };

  // Get status styles
  const getStatusStyles = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Pending Verification":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "Blocked":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  // Get health profile styles
  const getHealthProfileStyles = (profile: User["healthProfile"]) => {
    switch (profile) {
      case "Active":
        return "bg-green-50 text-green-700";
      case "Not Started":
        return "bg-gray-100 text-gray-700";
      case "Flagged":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  // Get status icon
  const getStatusIcon = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return <CheckCircle size={12} className="mr-1" />;
      case "Pending Verification":
        return <Clock size={12} className="mr-1" />;
      case "Blocked":
        return <Ban size={12} className="mr-1" />;
      default:
        return null;
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
                className="px-8 py-4 text-gray-900 border-b-2 border-green-600 flex items-center gap-3 text-base hover:bg-gray-50"
              >
                <span className="text-xl">👥</span> All User
              </button>
              <button 
                onClick={() => window.location.href = '/Users/HealthProfiles'}
                className="px-8 py-4 font-semibold text-gray-900  flex items-center gap-3 text-base"
              >
                <span className="text-xl">❤️</span> Health Profile
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              All Users
            </h1>
            <p className="text-gray-600 text-sm">
              A complete list of all registered Distributors & retailers in the rewards program.
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
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>
              
              {/* Role Filter */}
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[140px] pr-10"
                >
                  <option value="all">All Roles</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Retailer">Retailer</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[160px] pr-10"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Blocked">Blocked</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>

              {/* City Filter */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[140px] pr-10"
                >
                  <option value="all">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Islamabad">Islamabad</option>
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

          {/* Users Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Member ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">City/Region</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email Address</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Coin Balance</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Health Profile</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Joined On</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Activity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* ID */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {user.id}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {/* <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                            {user.name.charAt(0)}
                          </div> */}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.role}
                        </div>
                      </td>

                      {/* City */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.city}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(user.status)}`}>
                          {getStatusIcon(user.status)}
                          {user.status}
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.email}
                        </div>
                      </td>

                      {/* Coin Balance */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCoinBalance(user.coinBalance)}
                        </div>
                      </td>

                      {/* Health Profile */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium ${getHealthProfileStyles(user.healthProfile)}`}>
                          {user.healthProfile}
                        </div>
                      </td>

                      {/* Joined On */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.joinedOn}
                        </div>
                      </td>

                      {/* Last Activity */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {user.lastActivity}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openModal("view", user)}
                            className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-xs font-medium flex items-center gap-1"
                          >
                            <Eye size={14} />
                            {/* View */}
                          </button>
                          <button 
                            onClick={() => openModal("edit", user)}
                            className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-xs font-medium flex items-center gap-1"
                          >
                            <Edit size={14} />
                            {/* Edit */}
                          </button>
                          {/* <button   className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-xs font-medium flex items-center gap-1">
                            <DeleteIcon size={16} />
                          </button> */}
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
              <span className="font-medium">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of{" "}
              <span className="font-medium">{filteredUsers.length}</span> users
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

        {/* Modal Backdrop with Blur Effect */}
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blur Background */}
            <div 
              className="absolute inset-0 bg-white/80 backdrop-blur-sm"
              onClick={closeModal}
            />
            
     {/* View Details Modal - Exact Figma Design */}
{modalType === "view" && selectedUser && (
  <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
    {/* Main Content */}
    <div className="p-8">
      {/* Header Row with User Detail and Close button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">User Detail</h1>
          <p className="text-sm font-medium text-gray-500">{selectedUser.id}</p>
        </div>
        <button 
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>

      {/* User Info with OR logo */}
      <div className="flex items-start gap-4 mb-8 pb-8 border-b border-gray-200">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
          OR
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Olivia Rhyne</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-gray-600">@olivia</span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(selectedUser.status)}`}>
              {getStatusIcon(selectedUser.status)}
              {selectedUser.status}
            </span>
          </div>
        </div>
      </div>

      {/* BASIC INFORMATION Section */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Role</div>
            <div className="text-base font-semibold text-gray-900">{selectedUser.role}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Email</div>
            <div className="text-base font-medium text-gray-900">{selectedUser.email}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Phone</div>
            <div className="text-base font-medium text-gray-900">{selectedUser.phone || "Not provided"}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">City/Region</div>
            <div className="text-base font-medium text-gray-900">{selectedUser.city}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Coin Balance</div>
            <div className="text-xl font-bold text-gray-900">{formatCoinBalance(selectedUser.coinBalance)}</div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Health Profile</div>
            <div className={`inline-flex items-center px-3 py-1.5 rounded text-sm font-medium ${getHealthProfileStyles(selectedUser.healthProfile)}`}>
              {selectedUser.healthProfile}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-gray-500 mb-1">Joined On</div>
            <div className="text-base font-medium text-gray-900">{selectedUser.joinedOn}</div>
          </div>
        </div>
      </div>

      {/* DISTRIBUTOR INFORMATION Section (Only for Distributors) */}
      {selectedUser.role === "Distributor" && selectedUser.distributionLines && (
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-1300 uppercase tracking-wider mb-6">DISTRIBUTOR INFORMATION</h3>
          
          <div className="space-y-6">
            {/* Products Distributed */}
            <div>
              <div className="text-sm text-gray-500 mb-2">Products Distributed</div>
              <div className="space-y-1">
                {selectedUser.products?.map((product, index) => (
                  <div key={index} className="text-base font-medium text-gray-900">
                    • {product.name} {product.description && <span className="text-gray-500 font-normal">• {product.description}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Distribution Lines */}
            <div>
              <div className="text-sm text-gray-500 mb-1">Distribution Lines</div>
              <div className="text-base font-medium text-gray-900">{selectedUser.distributionLines}</div>
            </div>

            {/* Connected Retailers and Ledger Status */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">Connected Retailers</div>
                <div className="text-2xl font-bold text-gray-900">{selectedUser.connectedRetailers}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Ledger Status</div>
                <div className="text-base font-medium text-gray-900">{selectedUser.ledgerStatus}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity History Button */}
      <div className="pt-6 border-t border-gray-200">
        <button 
          onClick={() => setModalType("activity")}
          className="px-4 py-2 text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-2"
        >
          <Activity size={16} />
          View Activity History
        </button>
      </div>
    </div>
  </div>
)}

            {/* Activity History Modal */}
      {modalType === "activity" && selectedUser && (
  <>
    {/* Blur Overlay */}
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
      onClick={closeModal}
    />
    
    {/* Modal Container */}
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <div className="text-xl font-bold text-gray-800 mb-1">Activity History</div>
            <p className="text-lg text-gray-600 mt-1">
              Olivia Rhyne <span className="text-gray-400">(ML-DST-1001)</span>
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Activity Content */}
        <div className="p-6 space-y-6">
          {/* Order placed */}
          <div className="border-l-4 border-green-600 pl-4 py-1">
            <p className="text-sm text-gray-500 mb-1">31 Dec 2024, 10:30 AM</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Order placed</p>
            <p className="text-sm text-gray-600">Order #ORD-4521 - 50 bags OPC Cement</p>
          </div>

          {/* Coins earned */}
          <div className="border-l-4 border-green-600 pl-4 py-1">
            <p className="text-sm text-gray-500 mb-1">30 Dec 2024, 03:15 PM</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Coins earned</p>
            <p className="text-sm text-gray-600">
              +250 coins from order completion
            </p>
          </div>

          {/* Profile updated */}
          <div className="border-l-4 border-green-600 pl-4 py-1">
            <p className="text-sm text-gray-500 mb-1">29 Dec 2024, 11:45 AM</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Profile updated</p>
            <p className="text-sm text-gray-600">Contact information updated</p>
          </div>

          {/* Tax challan uploaded */}
          <div className="border-l-4 border-green-600 pl-4 py-1">
            <p className="text-sm text-gray-500 mb-1">28 Dec 2024, 09:20 AM</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Tax challan uploaded</p>
            <p className="text-sm text-gray-600">Challan #CH-1234 submitted</p>
          </div>

          {/* Location updated */}
          <div className="border-l-4 border-green-600 pl-4 py-1">
            <p className="text-sm text-gray-500 mb-1">27 Dec 2024, 02:00 PM</p>
            <p className="text-sm font-semibold text-gray-900 mb-1">Location updated</p>
            <p className="text-sm text-gray-600">Shop location verified</p>
          </div>
        </div>

        {/* Close Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <button
            onClick={closeModal}
            className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-base"
            style={{ backgroundColor: "rgba(1, 80, 41, 1)" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </>
)}

            {/* Edit User Modal */}
            {modalType === "edit" && selectedUser && (
              <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Edit User</h2>
                    <button 
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editedUser.name || ""}
                        onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={editedUser.email || ""}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={editedUser.phone || ""}
                        onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City/Region
                      </label>
                      <input
                        type="text"
                        value={editedUser.city || ""}
                        onChange={(e) => setEditedUser({...editedUser, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activate User Modal */}
            {modalType === "activate" && selectedUser && (
              <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Activate User</h2>
                    <button 
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Activation Outcome:</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-green-600 mt-0.5" size={16} />
                          User access will be restored
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-green-600 mt-0.5" size={16} />
                          Can place new orders
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-green-600 mt-0.5" size={16} />
                          Can earn coins
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-green-600 mt-0.5" size={16} />
                          User will be notified via email
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-green-600 mt-0.5" size={16} />
                          Full system access granted
                        </li>
                      </ul>
                    </div>

                    <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                      The user will be immediately activated and notified.
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                      <button
                        onClick={closeModal}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleActivateUser}
                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                      >
                        Confirm Activation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}