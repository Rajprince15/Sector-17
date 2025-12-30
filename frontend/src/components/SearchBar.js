import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ value, onChange, placeholder = "Search for products or shops..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-3xl mx-auto"
    >
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-16 pl-16 pr-6 rounded-full border-2 border-border bg-card/50 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg shadow-lg hover:shadow-xl outline-none"
          data-testid="search-input"
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;