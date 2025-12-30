import React from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ShopCard = ({ shop }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-xl transition-all"
      data-testid={`shop-card-${shop.id}`}
    >
      <div className="h-48 overflow-hidden bg-muted">
        <img
          src={shop.image_url}
          alt={shop.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl" data-testid={`shop-name-${shop.id}`}>
              {shop.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium mt-1">
              {shop.category}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {shop.description}
        </p>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{shop.address}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{shop.contact}</span>
          </div>
        </div>

        <Link
          to={`/shop/${shop.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all font-medium group-hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          data-testid={`shop-view-button-${shop.id}`}
        >
          View Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ShopCard;