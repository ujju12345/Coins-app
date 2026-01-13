"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import Layout from "../layout/Layout";

interface AllOrder {
  id: string;
  orderID: string;
  name: string;
  username: string;
  distributor: string;
  product: string;
  quantity: string;
  unit: string;
  value: string;
  status: "Delivered" | "Approved" | "Dispatched" | "Rejected" | "Cancelled";
  coinStatus: "Issued" | "Pending" | "Reversed" | "None";
  orderDate: string;
}

export default function AllOrders() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data based on the image
  const orders: AllOrder[] = [
    {
      id: "1",
      orderID: "ORD-1245",
      name: "Olivia Rhye",
      username: "@olivia",
      distributor: "Shadab Enterprises",
      product: "OPC Cement",
      quantity: "50",
      unit: "Tons",
      value: "Rs 125K",
      status: "Delivered",
      coinStatus: "Issued",
      orderDate: "20 Dec",
    },
    {
      id: "2",
      orderID: "ORD-1246",
      name: "Phoenix Baker",
      username: "@phoenix",
      distributor: "Khan Industries",
      product: "White Cement",
      quantity: "25",
      unit: "Tons",
      value: "Rs 89K",
      status: "Approved",
      coinStatus: "Pending",
      orderDate: "22 Dec",
    },
    {
      id: "3",
      orderID: "ORD-1247",
      name: "Lana Steiner",
      username: "@lana",
      distributor: "Shadab Enterprises",
      product: "SRC Cement",
      quantity: "100",
      unit: "Bags",
      value: "Rs 45K",
      status: "Dispatched",
      coinStatus: "Pending",
      orderDate: "23 Dec",
    },
    {
      id: "4",
      orderID: "ORD-1248",
      name: "Demi Wilkinson",
      username: "@demi",
      distributor: "Shadab Enterprises",
      product: "OPC Cement",
      quantity: "40",
      unit: "Tons",
      value: "Rs 102K",
      status: "Rejected",
      coinStatus: "Reversed",
      orderDate: "21 Dec",
    },
    {
      id: "5",
      orderID: "ORD-1249",
      name: "Candice Wu",
      username: "@candice",
      distributor: "Shadab Enterprises",
      product: "OPC Cement",
      quantity: "30",
      unit: "Tons",
      value: "Rs 78K",
      status: "Cancelled",
      coinStatus: "None",
      orderDate: "19 Dec",
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

  const getStatusColor = (status: AllOrder["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Approved":
        return "bg-blue-100 text-blue-800";
      case "Dispatched":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCoinStatusColor = (coinStatus: AllOrder["coinStatus"]) => {
    switch (coinStatus) {
      case "Issued":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Reversed":
        return "bg-red-100 text-red-800";
      case "None":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
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
                className="px-8 py-4 font-semibold  border-green-600 border-b-2 flex items-center gap-3 text-base"
                onClick={() => window.location.href = '/orders/AllOrders'}

              >
                <span className="text-xl">📦</span> All Orders
              </button>
                    <button 
                className="px-8 py-4 font-semibold   flex items-center gap-3 text-base"
                onClick={() => window.location.href = '/orders/OrderHistory'}
              >
                <span className="text-xl">📦</span>Order History
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[20px] font-bold text-gray-900 mb-2 leading-[100%]">
              All Orders
            </h1>
            <p className="text-gray-600 text-sm">
              View and track all orders across their complete lifecycle.
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
                  <option value="all">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="approved">Approved</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
              
              {/* Coin Status Filter */}
              <div className="relative">
                <select
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[160px] pr-10"
                  defaultValue="all"
                >
                  <option value="all">All Coin Status</option>
                  <option value="issued">Issued</option>
                  <option value="pending">Pending</option>
                  <option value="reversed">Reversed</option>
                  <option value="none">None</option>
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
                      Coin Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Order Date
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

                      {/* Status Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center text-sm font-medium px-3 py-1.5 rounded ${getStatusColor(order.status)}`}
                        >
                         • {order.status}
                        </div>
                      </td>

                      {/* Coin Status Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center text-sm font-medium px-3 py-1.5 rounded ${getCoinStatusColor(order.coinStatus)}`}
                        >
                         • {order.coinStatus}
                        </div>
                      </td>

                      {/* Order Date Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {order.orderDate}
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="px-3 py-1.5 text-black underline hover:text-gray-700 text-xs font-medium">
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
                8
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                9
              </button>
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
  );
}