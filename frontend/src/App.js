import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/sonner';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShopDetails from './pages/ShopDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageShops from './pages/ManageShops';
import ManageProducts from './pages/ManageProducts';
import '@/App.css';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="App min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/:shopId" element={<ShopDetails />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/shops"
              element={
                <PrivateRoute>
                  <ManageShops />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <PrivateRoute>
                  <ManageProducts />
                </PrivateRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;