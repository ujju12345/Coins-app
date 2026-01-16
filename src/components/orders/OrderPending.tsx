"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, Heart, X as XIcon, Check, Clock, User, Building, Package, DollarSign, Calendar, AlertTriangle, Shield, CheckCircle } from "lucide-react";
import Layout from "../layout/Layout";

interface PendingOrder {
  id: string;
  orderID: string;
  retailerID: string;
  name: string;
  username: string;
  product: string;
  quantity: string;
  unit: string;
  value: string;
  submitted: string;
  waiting: string;
  urgency: "Urgent" | "Normal";
}

export default function OrderPending() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<PendingOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data based on Figma
  const orders: PendingOrder[] = [
    {
      id: "1",
      orderID: "ORD-1245",
      retailerID: "ML-RTL-2034",
      name: "Olivia Rhye",
      username: "@olivia",
      product: "OPC Cement",
      quantity: "50",
      unit: "Tons",
      value: "Rs 125K",
      submitted: "24 Dec, 10:30 AM",
      waiting: "26 hrs",
      urgency: "Urgent",
    },
    {
      id: "2",
      orderID: "ORD-1246",
      retailerID: "ML-RTL-2098",
      name: "Phoenix Baker",
      username: "@phoenix",
      product: "White Cement",
      quantity: "25",
      unit: "Tons",
      value: "Rs 89K",
      submitted: "24 Dec, 1:15 PM",
      waiting: "21 hrs",
      urgency: "Normal",
    },
    {
      id: "3",
      orderID: "ORD-1247",
      retailerID: "ML-RTL-2145",
      name: "Lana Steiner",
      username: "@lana",
      product: "OPC Cement",
      quantity: "100",
      unit: "Bags",
      value: "Rs 45K",
      submitted: "25 Dec, 9:00 AM",
      waiting: "6 hrs",
      urgency: "Normal",
    },
    {
      id: "4",
      orderID: "ORD-1248",
      retailerID: "ML-RTL-2014",
      name: "Demi Wilkinson",
      username: "@demi",
      product: "SRC Cement",
      quantity: "40",
      unit: "Tons",
      value: "Rs 102K",
      submitted: "23 Dec, 4:40 PM",
      waiting: "44 hrs",
      urgency: "Urgent",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    return (
      order.orderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.retailerID.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const openModal = (order: PendingOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    // Restore background scrolling
    document.body.style.overflow = 'unset';
  };

  const handleApprove = () => {
    // Handle approve logic here
    console.log("Approving order:", selectedOrder?.orderID);
    closeModal();
  };

  const handleReject = () => {
    // Handle reject logic here
    console.log("Rejecting order:", selectedOrder?.orderID);
    closeModal();
  };

  // Prevent closing modal when clicking inside modal content
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header Tabs */}
        <div className="border-b border-gray-200 mt-7">
          <div className="max-w-full">
            <div className="flex">
              <button 
                className="px-8 py-4 font-semibold text-gray-900 border-b-2 border-green-600 flex items-center gap-3 text-base"
                onClick={() => window.location.href = '/orders/OrderPending'}
              >
                <span className="text-xl">⏳</span> Pending Approval
              </button>
              <button 
                onClick={() => window.location.href = '/orders/AllOrders'}
                className="px-8 py-4 text-gray-600 flex items-center gap-3 text-base"
              >
                <span className="text-xl">📍</span> All Order
              </button>
              <button 
                onClick={() => window.location.href = '/orders/OrderHistory'}
                className="px-8 py-4 text-gray-600 flex items-center gap-3 text-base"
              >
                <span className="text-xl">📋</span> Order History
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[20px] font-bold text-gray-900 mb-2 leading-[100%]">
              Pending Order Approvals
            </h1>
            <p className="text-gray-600 text-sm">
              Review and approve retailer orders before dispatch and coin
              issuance.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-[552px]">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
                />
              </div>
              
              {/* Status Filter */}
              <div className="relative">
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[160px] pr-10"
                  defaultValue="all"
                >
                  <option value="all">All Urgency</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
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

          {/* Orders Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Waiting
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Urgency
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* ID Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {order.retailerID}
                        </span>
                      </td>

                      {/* Order ID Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {order.orderID}
                        </span>
                      </td>

                      {/* Name Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.username}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Product Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {order.product}
                        </div>
                      </td>

                      {/* Qty Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {order.quantity}{" "}
                          <span className="text-gray-500">{order.unit}</span>
                        </div>
                      </td>

                      {/* Value Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.value}
                        </div>
                      </td>

                      {/* Submitted Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {order.submitted}
                        </div>
                      </td>

                      {/* Waiting Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.waiting}
                        </div>
                      </td>

                      {/* Urgency Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded"
                          style={{
                            backgroundColor:
                              order.urgency === "Urgent"
                                ? "rgba(246, 205, 18, 0.1)"
                                : "#f3f4f6",
                          }}
                        >
                          <Heart
                            size={14}
                            className={
                              order.urgency === "Urgent"
                                ? "fill-[#852221]"
                                : "text-gray-400 fill-gray-400"
                            }
                          />
                          <span
                            className="text-xs font-medium"
                            style={{
                              color:
                                order.urgency === "Urgent"
                                  ? "#852221"
                                  : "#4b5563",
                            }}
                          >
                            {order.urgency}
                          </span>
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => openModal(order)}
                            className="px-3 py-1.5 text-black underline hover:text-gray-700 text-xs font-medium"
                          >
                            Review
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
              <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> orders
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Order Approval Modal with Blur Background */}
{/* Order Approval Modal with Blur Background */}
{isModalOpen && selectedOrder && (
  <>
    {/* Blur Overlay */}
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
      onClick={closeModal}
    />
    
    {/* Modal Container */}
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={handleModalClick}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <div className="text-lg font-bold text-gray-900">Order Approval Review</div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-semibold text-gray-900">{selectedOrder.orderID}</span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-2 text-amber-600 font-medium">
                <Clock size={15} />
                <span className="text-semibold">Waiting {selectedOrder.waiting}</span>
              </div>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Content - Vertical Layout */}
        <div className="p-6 space-y-6">
          {/* Order Summary Section in Box */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="text-base font-semibold text-gray-900">{selectedOrder.orderID}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-3">Retailer Details</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="font-semibold text-gray-700">OR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedOrder.name}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.username}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-3">Distributor</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Shaadab Enterprises</p>
                    <p className="text-sm text-gray-500">Lahore Line A</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-3">Product & Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Package size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedOrder.product}</p>
                    <p className="text-sm text-gray-500">{selectedOrder.quantity} {selectedOrder.unit}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-3">Total Order Value</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <DollarSign size={20} className="text-gray-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{selectedOrder.value}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-3">Scheduled</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedOrder.submitted}</p>
                    <p className="text-sm font-medium text-amber-600">
                      Waiting: {selectedOrder.waiting}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Retailer Context Section in Box */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Retailer Context</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Retailer Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-base font-medium text-gray-900">Active</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">Past 30-Day Orders</p>
                <p className="text-2xl font-bold text-gray-900">12 orders</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">Avg Monthly Order Value</p>
                <p className="text-2xl font-bold text-gray-900">Rs 450K</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">Current Coin Balance</p>
                <p className="text-2xl font-bold text-gray-900">8,500 coins</p>
              </div>
            </div>
          </div>

          {/* Distributor Context Section in Box */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Distributor Context</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Ledger Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-base font-medium text-gray-900">Current</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">Distribution Line Availability</p>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-base font-medium text-gray-900">Available</span>
                </div>
                <p className="text-sm text-gray-500 ml-6 mt-1">Lahore Line A</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-2">Open Dispatches</p>
                <p className="text-2xl font-bold text-gray-900">3 active dispatches</p>
              </div>
            </div>
          </div>

          {/* Admin Actions Section in Box */}
        

          {/* Approval Buttons Section */}
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                className="flex-1 px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2 text-base"
              >
                <Check size={20} />
                Approve Order
              </button>
              
              <button
                onClick={handleReject}
                className="flex-1 px-6 py-4 bg-red-600 text-white border border-red-600 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2 text-base"
              >
                <XIcon size={20} />
                Reject Order
              </button>
            </div>

            {/* Note Section */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Note:</span> Approving this order will issue health coins to the retailer and dispatch the order to the distributor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)}
      </div>
    </Layout>
  );
}