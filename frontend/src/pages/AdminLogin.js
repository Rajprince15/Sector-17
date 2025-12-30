import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.adminLogin(email, password);
      if (response.success) {
        localStorage.setItem('adminToken', response.data.token);
        toast.success('Login successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error(response.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-xl border border-border p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Admin Login</h2>
            <p className="text-muted-foreground mt-2">Sector-17 Store Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sector17.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                  data-testid="admin-email-input"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                  data-testid="admin-password-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="admin-login-button"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials:</p>
            <p>Email: admin@sector17.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;