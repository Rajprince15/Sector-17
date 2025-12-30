import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import api from '../services/api';
import { toast } from 'sonner';

const ManageShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingShop, setEditingShop] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    address: '',
    contact: '',
    image_url: ''
  });

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const response = await api.getShops();
      setShops(response.data);
    } catch (error) {
      toast.error('Failed to load shops');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingShop) {
        await api.updateShop(editingShop.id, formData);
        toast.success('Shop updated successfully');
      } else {
        await api.addShop(formData);
        toast.success('Shop added successfully');
      }
      resetForm();
      loadShops();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (shop) => {
    setEditingShop(shop);
    setFormData({
      name: shop.name,
      category: shop.category,
      description: shop.description,
      address: shop.address,
      contact: shop.contact,
      image_url: shop.image_url
    });
    setShowForm(true);
  };

  const handleDelete = async (shopId) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      try {
        await api.deleteShop(shopId);
        toast.success('Shop deleted successfully');
        loadShops();
      } catch (error) {
        toast.error('Failed to delete shop');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      description: '',
      address: '',
      contact: '',
      image_url: ''
    });
    setEditingShop(null);
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
            <h1 className="text-4xl font-bold mb-2">Manage Shops</h1>
            <p className="text-muted-foreground">Add, edit, or remove shops</p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
              data-testid="add-shop-button"
            >
              <Plus className="w-5 h-5" />
              Add Shop
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
                {editingShop ? 'Edit Shop' : 'Add New Shop'}
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
                  <label className="text-sm font-medium mb-2 block">Shop Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    data-testid="shop-name-input"
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
                    data-testid="shop-category-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    data-testid="shop-address-input"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Contact *</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    data-testid="shop-contact-input"
                  />
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
                  data-testid="shop-description-input"
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
                  data-testid="shop-image-input"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20"
                  data-testid="submit-shop-button"
                >
                  {editingShop ? 'Update Shop' : 'Add Shop'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
                  data-testid="cancel-shop-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="shops-list">
          {shops.map((shop) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all"
              data-testid={`admin-shop-card-${shop.id}`}
            >
              <div className="h-48 bg-muted overflow-hidden">
                <img src={shop.image_url} alt={shop.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{shop.name}</h3>
                <span className="inline-flex px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                  {shop.category}
                </span>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{shop.description}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(shop)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
                    data-testid={`edit-shop-${shop.id}`}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(shop.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-sm font-medium"
                    data-testid={`delete-shop-${shop.id}`}
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

export default ManageShops;