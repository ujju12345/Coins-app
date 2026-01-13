import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Verification from "../pages/auth/Verification";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserList from "../pages/Users/UserList";
import HealthProfiles from "../pages/Users/HealthProfiles";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import DispatchQueue from "../components/dispatches/DispatchQueue";
import Tracking from "../components/dispatches/tracking";
import OrderPending from "../components/orders/OrderPending";
import AllOrders from "../components/orders/AllOrders";
import OrderHistory from "../components/orders/OrderHistory";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/verification"
        element={
          <PublicRoute>
            <Verification />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Users Routes */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
           <Route
        path="/dispatches/tracking"
        element={
          <ProtectedRoute>
            <Tracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/health-profiles"
        element={
          <ProtectedRoute>
            <HealthProfiles />
          </ProtectedRoute>
        }
      />

      <Route
        path="dispatches/DispatchQueue"
        element={
          <ProtectedRoute>
            <DispatchQueue />
          </ProtectedRoute>
        }
      />

      <Route
        path="orders/OrderPending"
        element={
          <ProtectedRoute>
            <OrderPending />
          </ProtectedRoute>
        }
      />

            <Route
        path="orders/AllOrders"
        element={
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        }
      />

                  <Route
        path="orders/OrderHistory"
        element={
          <ProtectedRoute>
            <OrderHistory />
          </ProtectedRoute>
        }
      />
      {/* Redirect root to login or dashboard based on auth status */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Catch all - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
