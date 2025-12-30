import React from 'react';
import { ShoppingBag, Store as StoreIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl transition-all"
      data-testid={`product-card-${product.id}`}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-1" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        
        <Link
          to={`/shop/${product.shop_id}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          data-testid={`product-shop-link-${product.id}`}
        >
          <StoreIcon className="w-4 h-4" />
          <span>{product.shop_name}</span>
        </Link>

        <div className="flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-bold text-primary" data-testid={`product-price-${product.id}`}>
              ₹{product.price.toLocaleString()}
            </p>
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium mt-1">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-3 right-3">
        <div className="w-10 h-10 rounded-full bg-secondary/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <ShoppingBag className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;