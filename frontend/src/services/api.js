import { products, shops, categories, adminUsers } from '../utils/mockData';

const USE_MOCK_DATA = true;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const api = {
  searchProducts: async (query, filters = {}) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      
      let results = [...products];
      
      if (query && query.trim()) {
        const searchTerm = query.toLowerCase();
        results = results.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.shop_name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters.category && filters.category !== 'all') {
        results = results.filter((p) => p.category === filters.category);
      }
      
      if (filters.shop && filters.shop !== 'all') {
        results = results.filter((p) => p.shop_name === filters.shop);
      }
      
      if (filters.minPrice !== undefined) {
        results = results.filter((p) => p.price >= filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        results = results.filter((p) => p.price <= filters.maxPrice);
      }
      
      return { success: true, data: results };
    } else {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);
      if (filters.shop && filters.shop !== 'all') params.append('shop', filters.shop);
      if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice);
      
      const response = await fetch(`${API_BASE}/products/search?${params}`);
      return await response.json();
    }
  },

  getShops: async () => {
    if (USE_MOCK_DATA) {
      await delay(200);
      return { success: true, data: shops };
    } else {
      const response = await fetch(`${API_BASE}/shops`);
      return await response.json();
    }
  },

  getShopById: async (shopId) => {
    if (USE_MOCK_DATA) {
      await delay(200);
      const shop = shops.find((s) => s.id === shopId);
      const shopProducts = products.filter((p) => p.shop_id === shopId);
      return { success: true, data: { shop, products: shopProducts } };
    } else {
      const response = await fetch(`${API_BASE}/shops/${shopId}`);
      return await response.json();
    }
  },

  getCategories: async () => {
    if (USE_MOCK_DATA) {
      await delay(100);
      return { success: true, data: categories };
    } else {
      const response = await fetch(`${API_BASE}/categories`);
      return await response.json();
    }
  },

  adminLogin: async (email, password) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      const user = adminUsers.find((u) => u.email === email && u.password === password);
      if (user) {
        const token = 'mock_jwt_token_' + Date.now();
        return { success: true, data: { token, email: user.email } };
      }
      return { success: false, error: 'Invalid credentials' };
    } else {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await response.json();
    }
  },

  getProducts: async () => {
    if (USE_MOCK_DATA) {
      await delay(200);
      return { success: true, data: products };
    } else {
      const response = await fetch(`${API_BASE}/products`);
      return await response.json();
    }
  },

  addShop: async (shopData) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return { success: true, data: { id: Date.now().toString(), ...shopData } };
    } else {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(shopData)
      });
      return await response.json();
    }
  },

  updateShop: async (shopId, shopData) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return { success: true, data: { id: shopId, ...shopData } };
    } else {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/shops/${shopId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(shopData)
      });
      return await response.json();
    }
  },

  deleteShop: async (shopId) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return { success: true };
    } else {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/shops/${shopId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return await response.json();
    }
  },

  addProduct: async (productData) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return { success: true, data: { id: Date.now().toString(), ...productData } };
    } else {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      return await response.json();
    }
  },

  updateProduct: async (productId, productData) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return { success: true, data: { id: productId, ...productData } };
    } else {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      return await response.json();
    }
  },

  deleteProduct: async (productId) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      return { success: true };
    } else {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return await response.json();
    }
  }
};

export default api;