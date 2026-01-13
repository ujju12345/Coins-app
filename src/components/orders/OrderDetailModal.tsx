// components/OrderDetailModal.tsx
"use client";

import { X } from "lucide-react";

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderData?: {
    name: string;
    username: string;
    distributor: string;
    product: string;
    quantity: string;
    unit: string;
    value: string;
    status: string;
    coinOutcome: string;
    closedOn: string;
  };
}

export default function OrderDetailModal({ isOpen, onClose, orderId, orderData }: OrderDetailModalProps) {
  if (!isOpen) return null;

  // Mock data for the specific order
  const orderDetails = orderData || {
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
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-[20px] font-semibold text-gray-900">
              Order History Detail
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {orderId} • Read-only view
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="space-y-8">
              {/* Order Snapshot */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Snapshot
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order ID</p>
                      <p className="text-sm font-medium text-gray-900">{orderId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Retailer</p>
                      <div className="mt-1">
                        <p className="text-sm font-medium text-gray-900">
                          {orderDetails.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {orderDetails.username}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Distributor</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderDetails.distributor}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Product & Quantity</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderDetails.product}
                      </p>
                      <p className="text-xs text-gray-500">
                        {orderDetails.quantity} {orderDetails.unit}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order Value</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderDetails.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className="border-t border-gray-200 pt-8">
                {/* Order Summary */}
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order Status:</p>
                      <div className={`inline-flex items-center mt-1 px-3 py-1 rounded text-xs font-medium ${
                        orderDetails.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : orderDetails.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : orderDetails.status === "Cancelled"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {orderDetails.status}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Coin Outcome:</p>
                      <div className={`inline-flex items-center mt-1 px-3 py-1 rounded text-xs font-medium ${
                        orderDetails.coinOutcome === "Issued" 
                          ? "bg-green-100 text-green-800" 
                          : orderDetails.coinOutcome === "Reversed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {orderDetails.coinOutcome}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Order Value:</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {orderDetails.value}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Coins Issued:</p>
                      <p className="text-sm font-medium text-green-600 mt-1">
                        +980 coins
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifecycle Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Lifecycle Timeline
                </h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-gray-900">Order Created</p>
                      <p className="text-xs text-gray-500">12 Dec, 9:00 AM</p>
                      <p className="text-xs text-gray-500">By: {orderDetails.name}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-gray-900">Order Approved</p>
                      <p className="text-xs text-gray-500">12 Dec, 10:30 AM</p>
                      <p className="text-xs text-gray-500">By: Admin. Sarah Khan</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      {/* No connecting line after last item */}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Dispatched</p>
                      <p className="text-xs text-gray-500">13 Dec, 8:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closure Info */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Closure Info
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Closed By</p>
                      <p className="text-sm font-medium text-gray-900">System</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Closure Reason</p>
                      <p className="text-sm font-medium text-gray-900">
                        Delivery completed successfully
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Closed On</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderDetails.closedOn}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Final Status</p>
                      <p className="text-sm font-medium text-gray-900">
                        {orderDetails.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financials */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Financials
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Coin Amount</p>
                    <p className="text-sm font-medium text-gray-900">980 coins</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Coin Modality</p>
                    <p className="text-sm font-medium text-gray-900">Order Intake</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Ledger Reference ID</p>
                    <p className="text-sm font-medium text-gray-900">LDG-2025-0145</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}