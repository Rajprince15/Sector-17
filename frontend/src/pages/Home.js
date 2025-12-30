import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import ShopCard from '../components/ShopCard';
import api from '../services/api';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    shop: 'all',
    minPrice: 0,
    maxPrice: 50000
  });
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('products');

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    searchProducts();
  }, [searchQuery, filters]);

  const loadInitialData = async () => {
    try {
      const [shopsRes, categoriesRes] = await Promise.all([
        api.getShops(),
        api.getCategories()
      ]);
      setShops(shopsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const searchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.searchProducts(searchQuery, filters);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: 'linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Discover Sector-17
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find products and shops in Chandigarh's iconic market
            </p>
          </motion.div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-3 mt-8"
          >
            <button
              onClick={() => setViewMode('products')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                viewMode === 'products'
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-muted hover:bg-accent'
              }`}
              data-testid="view-products-button"
            >
              Products
            </button>
            <button
              onClick={() => setViewMode('shops')}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                viewMode === 'shops'
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-muted hover:bg-accent'
              }`}
              data-testid="view-shops-button"
            >
              Shops
            </button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              categories={categories}
              shops={shops}
            />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-20" data-testid="loading-spinner">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {viewMode === 'products' ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">
                        {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
                      </h2>
                      <span className="text-muted-foreground" data-testid="products-count">
                        {products.length} products
                      </span>
                    </div>
                    {products.length === 0 ? (
                      <div className="text-center py-20" data-testid="no-products-message">
                        <p className="text-muted-foreground text-lg">No products found</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="products-grid">
                        {products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">All Shops</h2>
                      <span className="text-muted-foreground" data-testid="shops-count">
                        {shops.length} shops
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" data-testid="shops-grid">
                      {shops.map((shop) => (
                        <ShopCard key={shop.id} shop={shop} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;