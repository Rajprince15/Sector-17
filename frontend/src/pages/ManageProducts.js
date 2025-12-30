import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    shop_id: '',
    shop_name: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, shopsRes] = await Promise.all([
        api.getProducts(),
        api.getShops()
      ]);
      setProducts(productsRes.data);
      setShops(shopsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedShop = shops.find(s => s.id === formData.shop_id);
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        shop_name: selectedShop?.name || ''
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await api.addProduct(productData);
        toast.success('Product added successfully');
      }
      resetForm();
      loadData();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url,
      shop_id: product.shop_id,
      shop_name: product.shop_name
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(productId);
        toast.success('Product deleted successfully');
        loadData();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image_url: '',
      shop_id: '',
      shop_name: ''
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="loading-spinner">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Products</h1>
            <p className="text-muted-foreground">Add, edit, or remove products</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
              data-testid="add-product-button"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          )}
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl border border-border p-6 mb-8 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                data-testid="close-form-button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    data-testid="product-name-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Price (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    data-testid="product-price-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category *</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    data-testid="product-category-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Shop *</label>
                  <select
                    value={formData.shop_id}
                    onChange={(e) => setFormData({ ...formData, shop_id: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    data-testid="product-shop-select"
                  >
                    <option value="">Select a shop</option>
                    {shops.map((shop) => (
                      <option key={shop.id} value={shop.id}>
                        {shop.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none resize-none"
                  data-testid="product-description-input"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Image URL *</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                  data-testid="product-image-input"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20"
                  data-testid="submit-product-button"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
                  data-testid="cancel-product-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-list">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all"
              data-testid={`admin-product-card-${product.id}`}
            >
              <div className="aspect-square bg-muted overflow-hidden">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{product.shop_name}</p>
                <p className="text-xl font-bold text-primary mb-2">₹{product.price.toLocaleString()}</p>
                <span className="inline-flex px-2 py-1 rounded-md bg-muted text-xs font-medium">
                  {product.category}
                </span>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm"
                    data-testid={`edit-product-${product.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-sm"
                    data-testid={`delete-product-${product.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;