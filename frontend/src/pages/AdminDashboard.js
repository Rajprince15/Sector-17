import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, Package, LayoutDashboard } from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalShops: 0,
    totalProducts: 0,
    categories: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [shopsRes, productsRes, categoriesRes] = await Promise.all([
        api.getShops(),
        api.getProducts(),
        api.getCategories()
      ]);
      setStats({
        totalShops: shopsRes.data.length,
        totalProducts: productsRes.data.length,
        categories: categoriesRes.data.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const cards = [
    {
      title: 'Total Shops',
      value: stats.totalShops,
      icon: Store,
      color: 'bg-primary',
      link: '/admin/shops'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-secondary',
      link: '/admin/products'
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: LayoutDashboard,
      color: 'bg-accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground mb-8">Manage Sector-17 Store</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-lg transition-all"
                  data-testid={`stat-card-${card.title.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-1">{card.title}</p>
                  <p className="text-3xl font-bold" data-testid={`stat-value-${card.title.toLowerCase().replace(' ', '-')}`}>
                    {card.value}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/admin/shops"
              className="group bg-card rounded-xl border border-border p-8 hover:shadow-xl transition-all"
              data-testid="manage-shops-link"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                  <Store className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Manage Shops</h3>
                  <p className="text-sm text-muted-foreground">Add, edit, or remove shops</p>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/products"
              className="group bg-card rounded-xl border border-border p-8 hover:shadow-xl transition-all"
              data-testid="manage-products-link"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-secondary/20">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Manage Products</h3>
                  <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;