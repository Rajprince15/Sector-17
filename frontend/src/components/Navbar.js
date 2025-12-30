import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, LayoutDashboard } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoggedIn = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-testid="navbar-home-link"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-primary/20">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Sector-17 Store</h1>
              <p className="text-xs text-muted-foreground">Chandigarh Market</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {!isAdminRoute && (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-accent transition-colors text-sm font-medium"
                data-testid="navbar-admin-link"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin
              </Link>
            )}
            
            {isAdminRoute && isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-sm font-medium"
                data-testid="navbar-logout-button"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;