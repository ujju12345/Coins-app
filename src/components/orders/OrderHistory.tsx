"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, Eye } from "lucide-react";
import Layout from "../layout/Layout";
import OrderDetailModal from "./OrderDetailModal";


interface OrderHistory {
  id: string;
  orderID: string;
  name: string;
  username: string;
  distributor: string;
  product: string;
  quantity: string;
  unit: string;
  value: string;
  status: "Delivered" | "Rejected" | "Cancelled" | "Completed";
  coinOutcome: "Issued" | "Reversed" | "None" | "Pending";
  closedOn: string;
}

export default function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data based on the updated image
  const orders: OrderHistory[] = [
    {
      id: "1",
      orderID: "ORD-1245",
      name: "Olivia Rhye",
      username: "@olivia",
      distributor: "Shadab Enterprises",
      product: "OPC Cement",
      quantity: "40",
      unit: "Tons",
      value: "Rs 98K",
      status: "Delivered",
      coinOutcome: "Issued",
      closedOn: "15 Dec",
    },
    {
      id: "2",
      orderID: "ORD-1246",
      name: "Phoenix Baker",
      username: "@phoenix",
      distributor: "Khan Industries",
      product: "White Cement",
      quantity: "20",
      unit: "Tons",
      value: "Rs 72K",
      status: "Rejected",
      coinOutcome: "Reversed",
      closedOn: "14 Dec",
    },
    {
      id: "3",
      orderID: "ORD-1247",
      name: "Lana Steiner",
      username: "@lana",
      distributor: "Shadab Enterprises",
      product: "OPC Cement",
      quantity: "60",
      unit: "Bags",
      value: "Rs 28K",
      status: "Cancelled",
      coinOutcome: "None",
      closedOn: "13 Dec",
    },
    {
      id: "4",
      orderID: "ORD-1248",
      name: "Demi Wilkinson",
      username: "@demi",
      distributor: "Khan Industries",
      product: "SRC Cement",
      quantity: "50",
      unit: "Tons",
      value: "Rs 130K",
      status: "Delivered",
      coinOutcome: "Issued",
      closedOn: "12 Dec",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    return (
      order.orderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.distributor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStatusColor = (status: OrderHistory["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCoinOutcomeColor = (coinOutcome: OrderHistory["coinOutcome"]) => {
    switch (coinOutcome) {
      case "Issued":
        return "bg-green-100 text-green-800";
      case "Reversed":
        return "bg-red-100 text-red-800";
      case "None":
        return "bg-gray-100 text-gray-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewClick = (order: OrderHistory) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-white">
          {/* Header Tabs */}
          <div className="border-b border-gray-200 pt-8">
            <div className="max-w-full">
              <div className="flex">
                <button 
                  onClick={() => window.location.href = '/orders/OrderPending'}
                  className="px-8 py-4 text-gray-600 flex items-center gap-3 text-base"
                >
                  <span className="text-xl">⏳</span> Pending Approval
                </button>
              
                <button 
                  onClick={() => window.location.href = '/orders/AllOrders'}
                  className="px-8 py-4 text-gray-600  flex items-center gap-3 text-base"
                >
                  <span className="text-xl">📦</span> All Orders
                </button>
                <button 
                  className="px-8 py-4 font-semibold border-green-600 border-b-2 flex items-center gap-3 text-base"
                  onClick={() => window.location.href = '/orders/OrderHistory'}

                >
                  <span className="text-xl">📊</span> Order History
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-[20px] font-bold text-gray-900 mb-2 leading-[100%]">
                Order History
              </h1>
              <p className="text-gray-600 text-sm">
                Review completed and closed orders for reporting and audit.
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
                    placeholder="Search order history..."
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
                    <option value="all">All Status</option>
                    <option value="delivered">Delivered</option>
                    <option value="rejected">Rejected</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
                
                {/* Coin Outcome Filter */}
                <div className="relative">
                  <select
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[160px] pr-10"
                    defaultValue="all"
                  >
                    <option value="all">All Outcomes</option>
                    <option value="issued">Issued</option>
                    <option value="reversed">Reversed</option>
                    <option value="none">None</option>
                    <option value="pending">Pending</option>
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
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Retailer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Distributor
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
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Coin Outcome
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Closed On
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
                        {/* Order ID Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {order.orderID}
                          </span>
                        </td>

                        {/* Retailer Column */}
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

                        {/* Distributor Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {order.distributor}
                          </div>
                        </td>

                        {/* Product Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {order.product}
                          </div>
                        </td>

                        {/* Qty Column - Split into Quantity and Unit */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-gray-900">
                              {order.quantity}
                            </span>
                            <span className="text-sm text-gray-500">
                              {order.unit}
                            </span>
                          </div>
                        </td>

                        {/* Value Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.value}
                          </div>
                        </td>

                        {/* Status Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded ${getStatusColor(order.status)}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
                            {order.status}
                          </div>
                        </td>

                        {/* Coin Outcome Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-flex items-center text-sm font-medium px-3 py-1.5 rounded ${getCoinOutcomeColor(order.coinOutcome)}`}
                          >
                            {order.coinOutcome}
                          </div>
                        </td>

                        {/* Closed On Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {order.closedOn}
                          </div>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => handleViewClick(order)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-black underline hover:text-gray-700 text-xs font-medium"
                          >
                            <Eye size={12} />
                            View
                          </button>
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
                  ← Previous
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  3
                </button>
                <span className="text-gray-500">...</span>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  10
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrder?.orderID || ""}
        orderData={selectedOrder ? {
          name: selectedOrder.name,
          username: selectedOrder.username,
          distributor: selectedOrder.distributor,
          product: selectedOrder.product,
          quantity: selectedOrder.quantity,
          unit: selectedOrder.unit,
          value: selectedOrder.value,
          status: selectedOrder.status,
          coinOutcome: selectedOrder.coinOutcome,
          closedOn: selectedOrder.closedOn,
        } : undefined}
      />
    </>
  );
}