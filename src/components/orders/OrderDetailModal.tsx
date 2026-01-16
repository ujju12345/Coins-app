// components/OrderDetailModal.tsx
"use client";

import { X, Clock, User, Building, Package, DollarSign, CheckCircle, XCircle, Truck } from "lucide-react";

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
    coinAmount: string;
    coinModality: string;
    ledgerId: string;
  };
}

export default function OrderDetailModal({ isOpen, onClose, orderId, orderData }: OrderDetailModalProps) {
  if (!isOpen) return null;

  // Mock data matching the new Figma design
  const orderDetails = orderData || {
    name: "Olivia Rhyne",
    username: "@olivia",
    distributor: "Shaadab Enterprises",
    product: "OPC Cement",
    quantity: "40",
    unit: "Tons",
    value: "Rs 98K",
    status: "Delivered",
    coinOutcome: "Issued",
    closedOn: "15 Dec",
    coinAmount: "980 coins",
    coinModality: "Order Intake",
    ledgerId: "LDG-2025-0145",
  };

  return (
    <>
      {/* Blur Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div 
          className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
            <div>
              <div className="text-xl font-bold text-gray-800 mb-1">Order History Detail</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-semibold text-gray-900">{orderId}</span>
                <span className="text-gray-400">•</span>
                <span className="text-lg text-gray-600 font-medium">Read-only view</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Order Snapshot Section */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Order Snapshot</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Order ID</p>
                  <p className="text-base font-semibold text-gray-900">{orderId}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Retailer</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="font-semibold text-gray-700">OR</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{orderDetails.name}</p>
                      <p className="text-sm text-gray-500">{orderDetails.username}</p>
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
                      <p className="font-semibold text-gray-900">{orderDetails.distributor}</p>
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
                      <p className="font-semibold text-gray-900">{orderDetails.product}</p>
                      <p className="text-sm text-gray-500">{orderDetails.quantity} {orderDetails.unit}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Order Value</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <DollarSign size={20} className="text-gray-600" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{orderDetails.value}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifecycle Timeline Section */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Lifecycle Timeline</h3>
              
              <div className="space-y-6">
                {/* Order Created */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm font-semibold text-gray-900">Order Created</p>
                    <p className="text-sm text-gray-500 mt-1">12 Dec, 9:00 AM</p>
                    <p className="text-sm text-gray-500 mt-1">By: {orderDetails.name}</p>
                  </div>
                </div>
                
                {/* Order Approved */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm font-semibold text-gray-900">Order Approved</p>
                    <p className="text-sm text-gray-500 mt-1">12 Dec, 10:30 AM</p>
                    <p className="text-sm text-gray-500 mt-1">By: Admin: Sarah Khan</p>
                  </div>
                </div>
                
                {/* Dispatched */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm font-semibold text-gray-900">Dispatched</p>
                    <p className="text-sm text-gray-500 mt-1">13 Dec, 8:00 AM</p>
                  </div>
                </div>
                
                {/* Delivered */}
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    {/* No connecting line after last item */}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">Delivered</p>
                    <p className="text-sm text-gray-500 mt-1">15 Dec, 2:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Order Status:</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-500" />
                      <span className="text-base font-medium text-gray-900">Delivered</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Coin Outcome:</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-green-500" />
                      <span className="text-base font-medium text-gray-900">Issued</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Order Value:</p>
                    <p className="text-2xl font-bold text-gray-900">{orderDetails.value}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Coins Issued:</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">+980 coins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financials Section */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Financials</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Coin Amount</p>
                  <p className="text-2xl font-bold text-gray-900">{orderDetails.coinAmount}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Coin Modality</p>
                  <p className="text-2xl font-bold text-gray-900">{orderDetails.coinModality}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Ledger Reference ID</p>
                  <p className="text-2xl font-bold text-gray-900">{orderDetails.ledgerId}</p>
                </div>
              </div>
            </div>

            {/* Closure Info Section */}
            <div className="border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Closure Info</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Closed By</p>
                    <p className="text-2xl font-bold text-gray-900">System</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Closure Reason</p>
                    <p className="text-2xl font-bold text-gray-900">Delivery completed successfully</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">Closed On</p>
                    <p className="text-2xl font-bold text-gray-900">{orderDetails.closedOn}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Final Status</p>
                    <p className="text-2xl font-bold text-gray-900">{orderDetails.status}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}