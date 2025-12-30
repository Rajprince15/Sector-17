import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const FilterPanel = ({ filters, onFilterChange, categories, shops }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-card rounded-xl border border-border p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Category
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            data-testid="filter-category-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Shop
          </label>
          <select
            value={filters.shop || 'all'}
            onChange={(e) => onFilterChange({ ...filters, shop: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
            data-testid="filter-shop-select"
          >
            <option value="all">All Shops</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.name}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Price Range: ₹{filters.minPrice || 0} - ₹{filters.maxPrice || 50000}
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={filters.minPrice || 0}
              onChange={(e) => onFilterChange({ ...filters, minPrice: parseInt(e.target.value) })}
              className="w-full"
              data-testid="filter-price-min-slider"
            />
            <input
              type="range"
              min="0"
              max="50000"
              step="100"
              value={filters.maxPrice || 50000}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) })}
              className="w-full"
              data-testid="filter-price-max-slider"
            />
          </div>
        </div>

        <button
          onClick={() => onFilterChange({ category: 'all', shop: 'all', minPrice: 0, maxPrice: 50000 })}
          className="w-full py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
          data-testid="filter-reset-button"
        >
          Reset Filters
        </button>
      </div>
    </motion.div>
  );
};

export default FilterPanel;