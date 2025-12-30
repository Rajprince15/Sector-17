import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowLeft, Store as StoreIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const ShopDetails = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShopData();
  }, [shopId]);

  const loadShopData = async () => {
    try {
      const response = await api.getShopById(shopId);
      setShop(response.data.shop);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error loading shop:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="shop-not-found">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Shop not found</p>
          <Link to="/" className="text-primary hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 md:h-80 bg-muted overflow-hidden">
        <img
          src={shop.image_url}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-xl relative z-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            data-testid="back-to-home-link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <StoreIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="shop-name">
                {shop.name}
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-medium">
                {shop.category}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mt-4 text-lg">{shop.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5 text-primary" />
              <span>{shop.contact}</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-bold mb-6">Products from {shop.name}</h2>
          {products.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border" data-testid="no-products-message">
              <p className="text-muted-foreground">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="shop-products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;