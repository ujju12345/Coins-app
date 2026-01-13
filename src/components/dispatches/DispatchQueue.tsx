"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown, Eye } from "lucide-react";
import Layout from "../layout/Layout";

interface DispatchOrder {
  id: string;
  orderID: string;
  name: string;
  username: string;
  distributor: string;
  product: string;
  quantity: string;
  unit: string;
  status: "Awaiting Vehicle" | "Driver Assigned" | "Awaiting Confirmation" | "Delayed";
  vehicleDriver: string;
  eta: string;
  delay: string;
}

export default function DispatchQueue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Mock data matching your table exactly
  const orders: DispatchOrder[] = [
    {
      id: "1",
      orderID: "ORD-1245",
      name: "Olivia Rhyne",
      username: "@olivia",
      distributor: "Shadab Enterprises",
      product: "OPC Cement",
      quantity: "50",
      unit: "TONS",
      status: "Awaiting Vehicle",
      vehicleDriver: "Awaiting Vehicle",
      eta: "—",
      delay: "Today",
    },
    {
      id: "2",
      orderID: "ORD-1246",
      name: "Phoenix Baker",
      username: "@phoenix",
      distributor: "Khan Industries",
      product: "White Cement",
      quantity: "30",
      unit: "TONS",
      status: "Driver Assigned",
      vehicleDriver: "TRK-092 / Ali",
      eta: "Today",
      delay: "—",
    },
    {
      id: "3",
      orderID: "ORD-1247",
      name: "Lana Steiner",
      username: "@lana",
      distributor: "Shadab Enterprises",
      product: "OPC Cement",
      quantity: "40",
      unit: "TONS",
      status: "Awaiting Confirmation",
      vehicleDriver: "TRK-118 / Salman",
      eta: "Tomorrow",
      delay: "+1 Day",
    },
    {
      id: "4",
      orderID: "ORD-1248",
      name: "Demi Wilkinson",
      username: "@demi",
      distributor: "Khan Industries",
      product: "SRC Cement",
      quantity: "60",
      unit: "TONS",
      status: "Delayed",
      vehicleDriver: "TRK-113 / Ahmed",
      eta: "Overdue",
      delay: "+2 Days",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Awaiting Vehicle":
        return "bg-yellow-100 text-yellow-800";
      case "Driver Assigned":
        return "bg-green-100 text-green-800";
      case "Awaiting Confirmation":
        return "bg-yellow-100 text-yellow-800";
      case "Delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDelayColor = (delay: string) => {
    if (delay === "+1 Day" || delay === "+2 Days") {
      return "text-red-600";
    }
    return "text-gray-700";
  };

  const getActionButtons = (status: string) => {
    switch (status) {
      case "Awaiting Vehicle":
        return ["View", "Assign Vehicle"];
      case "Driver Assigned":
        return ["View"];
      case "Awaiting Confirmation":
        return ["View", "Verify"];
      case "Delayed":
        return ["View", "Escalate"];
      default:
        return ["View"];
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.distributor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header Tabs */}
        <div className="border-b border-gray-200 pt-7">
          <div className="max-w-full">
            <div className="flex">
              <button 
                className="px-8 py-4 font-semibold text-gray-900 border-green-600 border-b-2 flex items-center gap-3 text-base"
                onClick={() => window.location.href = '/dispatches/DispatchQueue'}

              >
                <span className="text-xl">📋</span> Dispatch Queue
              </button>
              <button 
                onClick={() => window.location.href = '/dispatches/Tracking'}
                className="px-8 py-4 text-gray-600 hover:text-gray-900 flex items-center gap-3 text-base"
              >
                <span className="text-xl">📍</span> Tracking
              </button>
             
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[20px] font-semibold text-gray-900 mb-2 leading-[100%]">
              Dispatch Queue
            </h1>
            <p className="text-gray-600 text-sm">
              Orders awaiting dispatch creation, verification, or departure confirmation.
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
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none bg-white text-sm min-w-[160px] pr-10"
                >
                  <option value="All">All Status</option>
                  <option value="Awaiting Vehicle">Awaiting Vehicle</option>
                  <option value="Driver Assigned">Driver Assigned</option>
                  <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                  <option value="Delayed">Delayed</option>
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
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Vehicle / Driver
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ETA
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Delay
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const actionButtons = getActionButtons(order.status);
                    return (
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
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-gray-900">
                              {order.quantity}
                            </span>
                            <span className="text-sm text-gray-500">
                              {order.unit}
                            </span>
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

                        {/* Vehicle / Driver Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">
                            {order.vehicleDriver}
                          </div>
                        </td>

                        {/* ETA Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-700">
                            {order.eta}
                          </div>
                        </td>

                        {/* Delay Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${getDelayColor(order.delay)}`}>
                            {order.delay}
                          </div>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {actionButtons.map((btn, index) => (
                              <button
                                key={index}
                                className={`px-3 py-1.5 text-xs font-medium rounded ${
                                  btn === "View"
                                    ? "text-black underline hover:text-gray-700"
                                    : btn === "Assign Vehicle"
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : btn === "Verify"
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : btn === "Escalate"
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                }`}
                              >
                                {btn}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
              <button className="px-4 py-2  text-white rounded text-sm font-medium"
              style={{ backgroundColor: "rgba(1, 80, 41, 1)" }}
              >
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm font-medium text-gray-700">
                2
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