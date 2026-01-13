"use client"

import { useState } from "react"
import { Search, Filter, MapPin, Navigation, ChevronDown } from "lucide-react"
import Layout from "../layout/Layout"

interface TrackingOrder {
  id: string
  orderID: string
  retailer: string
  distributor: string
  vehicle: string
  driver: string
  currentLocation: string
  eta: string
  status: "In Transit" | "Delayed" | "Out for Delivery" | "Delivered"
  retailerName: string
  assignedBy: string
}

export default function Tracking() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  // Mock data for tracking
  const orders: TrackingOrder[] = [
    {
      id: "1",
      orderID: "ORD-1245",
      retailer: "Olivia Rhye",
      retailerName: "Shadab Enterprises",
      distributor: "OPC Cement",
      vehicle: "TRK-092",
      driver: "Ali",
      currentLocation: "GT Road, Lahore",
      eta: "Today 4:30 PM",
      status: "In Transit",
      assignedBy: "Olivia Rhye"
    },
    {
      id: "2",
      orderID: "ORD-1246",
      retailer: "Phoenix Baker",
      retailerName: "Khan Industries",
      distributor: "White Cement",
      vehicle: "TRK-118",
      driver: "Salman",
      currentLocation: "Multan Bypass",
      eta: "Tomorrow 11:00 AM",
      status: "Delayed",
      assignedBy: "Phoenix Baker"
    },
    {
      id: "3",
      orderID: "ORD-1247",
      retailer: "Lana Steiner",
      retailerName: "Shadab Enterprises",
      distributor: "OPC Cement",
      vehicle: "TRK-141",
      driver: "Asif",
      currentLocation: "Near Retailer",
      eta: "Today 2:00 PM",
      status: "Out for Delivery",
      assignedBy: "Lana Steiner"
    },
    {
      id: "4",
      orderID: "ORD-1248",
      retailer: "Demi Wilkinson",
      retailerName: "Khan Industries",
      distributor: "SRC Cement",
      vehicle: "TRK-166",
      driver: "Bilal",
      currentLocation: "Delivered (Awaiting Proof)",
      eta: "Completed",
      status: "Delivered",
      assignedBy: "Demi Wilkinson"
    }
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.retailer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.driver.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header Tabs */}
        <div className="border-b border-gray-200 pt-7">
          <div className="max-w-full">
            <div className="flex">
              <button 
                onClick={() => window.location.href = '/dispatches/DispatchQueue'}
                className="px-8 py-4 text-gray-600 hover:text-gray-900 flex items-center gap-3 text-base"
              >
                <span className="text-xl">📋</span> Dispatch Queue
              </button>
              <button className="px-8 py-4 font-semibold text-gray-900 border-b-2 border-green-600 flex items-center gap-3 text-base"
                onClick={() => window.location.href = '/dispatches/tracking'}
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
              Tracking
            </h1>
            <p className="text-gray-600 text-sm">
              Monitor live and in-transit deliveries across all regions.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-[552px]">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search deliveries..."
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
                  <option value="In Transit">In Transit</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 text-sm">
                <MapPin size={16} />
                View Map
              </button>
              <button className="px-5 py-3  text-white rounded-lg  font-medium flex items-center gap-2 text-sm"
              style={{ backgroundColor: "rgba(1, 80, 41, 1)" }}
              >
                <Filter size={16} />
                Apply Filters
              </button>
            </div>
          </div>

          {/* Tracking Table */}
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
                      Vehicle
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Current Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ETA
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{order.orderID}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">{order.retailer.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.retailer}</div>
                            <div className="text-xs text-gray-500">{order.retailerName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{order.distributor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-700">{order.vehicle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{order.driver}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">{order.currentLocation}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-700">{order.eta}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded ${
                          order.status === "In Transit" ? "bg-blue-100 text-blue-800" : 
                          order.status === "Delayed" ? "bg-red-100 text-red-800" :
                          order.status === "Out for Delivery" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            order.status === "In Transit" ? "bg-blue-500" : 
                            order.status === "Delayed" ? "bg-red-500" :
                            order.status === "Out for Delivery" ? "bg-yellow-500" :
                            "bg-green-500"
                          }`}></span>
                          {order.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="px-3 py-1.5 text-black underline hover:text-gray-700 text-xs font-medium">
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results info */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredOrders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> deliveries
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-xs">
                Previous
              </button>
              <button className="px-3 py-1.5  text-white rounded  text-xs"
              style={{ backgroundColor: "rgba(1, 80, 41, 1)" }}>
                1
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-xs">
                2
              </button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-xs">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}