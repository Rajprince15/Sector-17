# Sector-17 Store - FRONTEND WORKFLOW

## Overview
This document outlines the complete frontend workflow for the Sector-17 Store marketplace application. The frontend is built with React, Tailwind CSS, and Framer Motion for animations.

---

## Technology Stack

### Core
- **React 19** - UI library
- **React Router DOM 7** - Routing
- **Tailwind CSS 3.4** - Styling
- **Framer Motion 12** - Animations

### UI Components
- **Shadcn/UI** - Pre-built accessible components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### State & Data
- **React Context** - Theme management
- **Axios** - HTTP client (for backend integration)
- **Mock Data** - Development data (switchable to real API)

---

## Project Structure

```
/app/frontend/
├── public/                      # Static assets
├── src/
│   ├── components/              # Reusable components
│   │   ├── ui/                  # Shadcn UI components
│   │   ├── Navbar.js           # Navigation bar
│   │   ├── ThemeToggle.js      # Light/Dark mode toggle
│   │   ├── SearchBar.js        # Search input component
│   │   ├── FilterPanel.js      # Filters sidebar
│   │   ├── ProductCard.js      # Product display card
│   │   └── ShopCard.js         # Shop display card
│   │
│   ├── pages/                   # Route pages
│   │   ├── Home.js             # Main page with search & products
│   │   ├── ShopDetails.js      # Individual shop page
│   │   ├── AdminLogin.js       # Admin authentication
│   │   ├── AdminDashboard.js   # Admin overview
│   │   ├── ManageShops.js      # CRUD for shops
│   │   └── ManageProducts.js   # CRUD for products
│   │
│   ├── context/                 # React Context
│   │   └── ThemeContext.js     # Theme state management
│   │
│   ├── services/                # API layer
│   │   └── api.js              # All API calls (mock + real)
│   │
│   ├── utils/                   # Utilities
│   │   └── mockData.js         # Sample data for development
│   │
│   ├── App.js                   # Main app component
│   ├── App.css                  # Custom styles
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles + Tailwind
│
├── package.json                 # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
└── .env                        # Environment variables
```

---

## Phase 1: Setup & Configuration (Day 1)

### 1.1 Install Dependencies
```bash
cd /app/frontend
yarn add framer-motion
```

### 1.2 Configure Tailwind CSS
Update `tailwind.config.js`:
- Add custom colors (Blue #2563EB, Orange #F97316)
- Add custom fonts (Outfit, Plus Jakarta Sans)
- Configure dark mode: 'class'

### 1.3 Setup Global Styles
Update `/src/index.css`:
- Import Google Fonts
- Define CSS custom properties for light/dark themes
- Configure Tailwind layers
- Set up color variables

### 1.4 Environment Variables
Create `/frontend/.env`:
```env
REACT_APP_BACKEND_URL=your_backend_url_here
```

### Deliverables
✅ Dependencies installed
✅ Tailwind configured with custom theme
✅ Global styles setup
✅ Fonts loaded

---

## Phase 2: Theme System (Day 1)

### 2.1 Create Theme Context
File: `/src/context/ThemeContext.js`
- Create ThemeContext with React.createContext()
- ThemeProvider component
- State management: light/dark
- localStorage persistence
- toggleTheme function
- useTheme custom hook

### 2.2 Wrap App with ThemeProvider
Update `/src/App.js`:
```jsx
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* App content */}
    </ThemeProvider>
  );
}
```

### 2.3 Create Theme Toggle Component
File: `/src/components/ThemeToggle.js`
- Button with Sun/Moon icons
- Use useTheme() hook
- Smooth transition animation
- Accessible (aria-label)

### Testing
- Toggle theme → changes immediately
- Refresh page → theme persists
- Check localStorage → 'theme' key exists

### Deliverables
✅ ThemeContext created
✅ ThemeToggle component working
✅ Theme persists across sessions
✅ Smooth animations

---

## Phase 3: Mock Data & API Service (Day 1-2)

### 3.1 Create Mock Data
File: `/src/utils/mockData.js`

Structure:
```javascript
export const categories = [
  { id: '1', name: 'Clothing' },
  // ... more categories
];

export const shops = [
  {
    id: '1',
    name: 'Gupta Garments',
    category: 'Clothing',
    description: '...',
    address: 'Shop 15, Sector-17, Chandigarh',
    contact: '+91-9876543210',
    image_url: 'https://...'
  },
  // ... more shops
];

export const products = [
  {
    id: '1',
    name: 'Cotton Kurta Set',
    description: '...',
    price: 1499,
    category: 'Clothing',
    image_url: 'https://...',
    shop_id: '1',
    shop_name: 'Gupta Garments'
  },
  // ... more products
];

export const adminUsers = [
  { email: 'admin@sector17.com', password: 'admin123' }
];
```

### 3.2 Create API Service Layer
File: `/src/services/api.js`

Key Features:
- `USE_MOCK_DATA` flag (true for dev, false for production)
- Simulate network delays with setTimeout()
- Return Promises (same as real API)
- Consistent response format: `{ success: true, data: [...] }`

Methods:
```javascript
const api = {
  // Public
  searchProducts(query, filters),
  getShops(),
  getShopById(shopId),
  getCategories(),
  
  // Admin
  adminLogin(email, password),
  getProducts(),
  addShop(shopData),
  updateShop(shopId, shopData),
  deleteShop(shopId),
  addProduct(productData),
  updateProduct(productId, productData),
  deleteProduct(productId)
};
```

### 3.3 Mock Implementation Example
```javascript
searchProducts: async (query, filters = {}) => {
  if (USE_MOCK_DATA) {
    await delay(300); // Simulate network
    let results = [...products];
    
    // Filter by query
    if (query) {
      results = results.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by category
    if (filters.category && filters.category !== 'all') {
      results = results.filter(p => p.category === filters.category);
    }
    
    return { success: true, data: results };
  } else {
    // Real API call
    const response = await fetch(`${API_BASE}/products/search?...`);
    return await response.json();
  }
}
```

### Testing
- Call api.searchProducts('shoes') → returns shoe products
- Call api.getShops() → returns all shops
- Check network delay (300ms)
- Verify response format

### Deliverables
✅ Mock data created (6 shops, 15+ products)
✅ API service layer implemented
✅ Easy switching between mock/real data
✅ Consistent response format

---

## Phase 4: Core Components (Day 2)

### 4.1 Navbar Component
File: `/src/components/Navbar.js`

Features:
- Logo with Store icon
- "Sector-17 Store" title
- ThemeToggle integration
- Admin link (public routes)
- Logout button (admin routes)
- Sticky positioning
- Backdrop blur effect

Layout:
```
[Logo + Title] ................... [Theme Toggle] [Admin Link]
```

### 4.2 SearchBar Component
File: `/src/components/SearchBar.js`

Features:
- Large, centered design
- Search icon (left side)
- Placeholder text
- onChange callback
- Framer Motion entrance animation
- Focus states
- Rounded full design

### 4.3 FilterPanel Component
File: `/src/components/FilterPanel.js`

Filters:
- Category dropdown (all categories)
- Shop dropdown (all shops)
- Price range: min slider + max slider
- "Reset Filters" button

Layout:
- Vertical sidebar
- Card style with border
- Section headings

### 4.4 ProductCard Component
File: `/src/components/ProductCard.js`

Layout:
```
┌─────────────────┐
│                 │
│  Product Image  │
│                 │
├─────────────────┤
│ Product Name    │
│ 🏪 Shop Name    │
│ ₹2,499          │
│ [Category]      │
└─────────────────┘
```

Features:
- Hover: lift up (-4px), scale image (110%)
- Shop name clickable → navigates to shop
- Price formatting with commas
- Category badge
- Shopping bag icon on hover

### 4.5 ShopCard Component
File: `/src/components/ShopCard.js`

Layout:
```
┌─────────────────┐
│                 │
│   Shop Image    │
│                 │
├─────────────────┤
│ Shop Name       │
│ [Category]      │
│ Description...  │
│ 📍 Address      │
│ 📞 Contact      │
│ [View Products] │
└─────────────────┘
```

Features:
- Hover effects
- All info displayed
- CTA button with arrow
- Link to shop details page

### Testing
- All components render correctly
- Hover animations smooth
- Links navigate properly
- Responsive on mobile/tablet/desktop

### Deliverables
✅ Navbar with theme toggle
✅ SearchBar with animations
✅ FilterPanel with all filters
✅ ProductCard with hover effects
✅ ShopCard with CTA button

---

## Phase 5: Home Page (Day 3)

### 5.1 Page Structure
File: `/src/pages/Home.js`

Sections:
1. Hero section with gradient background
2. Heading: "Discover Sector-17"
3. Subheading: "Find products and shops..."
4. SearchBar (large, centered)
5. View toggle: Products | Shops
6. Main content: FilterPanel (left) + Products Grid (right)

### 5.2 State Management
```javascript
const [searchQuery, setSearchQuery] = useState('');
const [filters, setFilters] = useState({
  category: 'all',
  shop: 'all',
  minPrice: 0,
  maxPrice: 50000
});
const [products, setProducts] = useState([]);
const [shops, setShops] = useState([]);
const [loading, setLoading] = useState(true);
const [viewMode, setViewMode] = useState('products');
```

### 5.3 Search Logic
```javascript
useEffect(() => {
  searchProducts();
}, [searchQuery, filters]);

const searchProducts = async () => {
  setLoading(true);
  const response = await api.searchProducts(searchQuery, filters);
  setProducts(response.data);
  setLoading(false);
};
```

### 5.4 Layout
```jsx
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
  <div className="lg:col-span-1">
    <FilterPanel />
  </div>
  
  <div className="lg:col-span-3">
    {viewMode === 'products' ? (
      <ProductsGrid />
    ) : (
      <ShopsGrid />
    )}
  </div>
</div>
```

### 5.5 Features
- Real-time search (updates on every keystroke)
- Filter updates trigger search
- View toggle: Products ↔ Shops
- Results count displayed
- Empty state: "No products found"
- Loading spinner during search

### Testing
- Search "shoes" → shows shoe products
- Search "Gupta" → shows Gupta Garments products
- Filter by category → updates results
- Price range filter → shows products in range
- Toggle to Shops view → shows shop cards
- Reset filters → shows all products

### Deliverables
✅ Complete home page layout
✅ Search functionality working
✅ Filters working (category, shop, price)
✅ View toggle (products/shops)
✅ Responsive grid
✅ Loading and empty states

---

## Phase 6: Shop Details Page (Day 3)

### 6.1 Page Structure
File: `/src/pages/ShopDetails.js`

Route: `/shop/:shopId`

Sections:
1. Hero banner (shop image)
2. Shop info card
3. Products grid (all products from this shop)

### 6.2 Data Fetching
```javascript
const { shopId } = useParams();
const [shop, setShop] = useState(null);
const [products, setProducts] = useState([]);

useEffect(() => {
  loadShopData();
}, [shopId]);

const loadShopData = async () => {
  const response = await api.getShopById(shopId);
  setShop(response.data.shop);
  setProducts(response.data.products);
};
```

### 6.3 Layout
- Hero image (h-64 md:h-80)
- Shop info card (overlapping hero, -mt-20)
- Back to home link with arrow
- Shop details: name, category, description, address, contact
- Products grid: 3-4 columns

### 6.4 Error Handling
- Shop not found → "Shop not found" message
- No products → "No products available" message
- Loading state → Spinner

### Testing
- Navigate from home → shop details
- Shop info displays correctly
- Products load
- Back button works
- 404 handling for invalid shop ID

### Deliverables
✅ Shop details page with hero
✅ Shop info displayed
✅ All products from shop shown
✅ Navigation working
✅ Error states handled

---

## Phase 7: Admin Authentication (Day 4)

### 7.1 Admin Login Page
File: `/src/pages/AdminLogin.js`

Route: `/admin`

Features:
- Centered login form
- Email input (with Mail icon)
- Password input (with Lock icon)
- Login button
- Demo credentials displayed
- Form validation
- Loading state during login

### 7.2 Authentication Logic
```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  const response = await api.adminLogin(email, password);
  
  if (response.success) {
    localStorage.setItem('adminToken', response.data.token);
    toast.success('Login successful!');
    navigate('/admin/dashboard');
  } else {
    toast.error('Invalid credentials');
  }
};
```

### 7.3 Private Route Component
File: `/src/App.js`

```javascript
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin" />;
};
```

### 7.4 Protected Routes
```jsx
<Route path="/admin" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={
  <PrivateRoute><AdminDashboard /></PrivateRoute>
} />
```

### Testing
- Login with correct credentials → redirect to dashboard
- Login with wrong credentials → error toast
- Access `/admin/dashboard` without login → redirect to login
- Token stored in localStorage
- Logout → clears token

### Deliverables
✅ Admin login page
✅ Authentication working
✅ Token storage
✅ Protected routes
✅ Redirects working

---

## Phase 8: Admin Dashboard (Day 4)

### 8.1 Dashboard Layout
File: `/src/pages/AdminDashboard.js`

Route: `/admin/dashboard`

Sections:
1. Header: "Admin Dashboard"
2. Stats cards: Total Shops, Total Products, Categories
3. Action cards: Manage Shops, Manage Products

### 8.2 Stats Loading
```javascript
const [stats, setStats] = useState({
  totalShops: 0,
  totalProducts: 0,
  categories: 0
});

useEffect(() => {
  loadStats();
}, []);

const loadStats = async () => {
  const [shops, products, categories] = await Promise.all([
    api.getShops(),
    api.getProducts(),
    api.getCategories()
  ]);
  setStats({
    totalShops: shops.data.length,
    totalProducts: products.data.length,
    categories: categories.data.length
  });
};
```

### 8.3 Layout
- 3-column grid for stats
- 2-column grid for action cards
- Icons: Store, Package, LayoutDashboard
- Hover effects on action cards

### Testing
- Stats load correctly
- Action cards link to management pages
- Responsive layout

### Deliverables
✅ Dashboard with stats
✅ Links to management pages
✅ Clean admin UI

---

## Phase 9: Manage Shops (Day 5)

### 9.1 Page Structure
File: `/src/pages/ManageShops.js`

Route: `/admin/shops`

Features:
- List all shops in grid
- "Add Shop" button
- Edit/Delete buttons on each shop card
- Add/Edit form (toggleable)

### 9.2 CRUD Operations
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (editingShop) {
    await api.updateShop(editingShop.id, formData);
    toast.success('Shop updated');
  } else {
    await api.addShop(formData);
    toast.success('Shop added');
  }
  loadShops();
  resetForm();
};

const handleDelete = async (shopId) => {
  if (confirm('Are you sure?')) {
    await api.deleteShop(shopId);
    toast.success('Shop deleted');
    loadShops();
  }
};
```

### 9.3 Form Fields
- Shop Name *
- Category *
- Description *
- Address *
- Contact *
- Image URL *

### 9.4 Form Animations
- Slide down when opened
- Framer Motion transitions
- Form validation

### Testing
- Add shop → appears in list
- Edit shop → changes reflected
- Delete shop → removed from list
- Form validation (required fields)
- Toast notifications

### Deliverables
✅ Shop management page
✅ Add/Edit/Delete working
✅ Form with validation
✅ Toast notifications
✅ Smooth animations

---

## Phase 10: Manage Products (Day 5)

### 10.1 Page Structure
File: `/src/pages/ManageProducts.js`

Route: `/admin/products`

Features:
- List all products in 4-column grid
- "Add Product" button
- Edit/Delete buttons on each product card
- Add/Edit form

### 10.2 Form Fields
- Product Name *
- Description *
- Price *
- Category *
- Shop * (dropdown)
- Image URL *

### 10.3 Shop Dropdown
```javascript
<select value={formData.shop_id} onChange={...}>
  <option value="">Select a shop</option>
  {shops.map(shop => (
    <option key={shop.id} value={shop.id}>
      {shop.name}
    </option>
  ))}
</select>
```

### 10.4 Price Handling
```javascript
price: parseFloat(formData.price)
```

### Testing
- Add product → assigned to shop
- Edit product → can change shop
- Delete product → removed
- Price formatting correct
- Product appears in shop details

### Deliverables
✅ Product management page
✅ Add/Edit/Delete working
✅ Shop assignment
✅ Form validation
✅ Price handling

---

## Phase 11: Animations & Polish (Day 6)

### 11.1 Framer Motion Animations

**Page Transitions:**
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

**Card Animations:**
```javascript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  whileHover={{ y: -4 }}
>
```

**Stagger Children:**
```javascript
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div variants={itemVariants} />
  ))}
</motion.div>
```

### 11.2 Hover Effects
- Cards: translate-y, shadow increase
- Buttons: scale (105%), shadow
- Images: scale (110%)
- Icons: rotate, color change

### 11.3 Loading States
- Spinner during API calls
- Skeleton loaders (optional)
- Disabled buttons during submission

### 11.4 Toast Notifications
- Success: green
- Error: red
- Position: top-right
- Auto-dismiss: 3 seconds

### 11.5 Responsive Design
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns
- Touch-friendly buttons (44px minimum)

### Testing
- All animations smooth (60fps)
- No layout shifts
- Responsive on all devices
- Accessibility (keyboard navigation)

### Deliverables
✅ Smooth animations
✅ Hover effects
✅ Loading states
✅ Toast notifications
✅ Fully responsive

---

## Phase 12: Backend Integration (Day 7)

### 12.1 Switch to Real API
File: `/src/services/api.js`

```javascript
const USE_MOCK_DATA = false; // Change to false
```

### 12.2 Update Environment Variable
```env
REACT_APP_BACKEND_URL=http://your-backend-url:8000
```

### 12.3 Error Handling
```javascript
try {
  const response = await api.searchProducts(query, filters);
  setProducts(response.data);
} catch (error) {
  if (error.response?.status === 401) {
    // Redirect to login
    navigate('/admin');
  } else {
    toast.error('An error occurred');
  }
}
```

### 12.4 Testing Checklist
- [ ] Search works with real data
- [ ] Filters work
- [ ] Shop details loads
- [ ] Admin login authenticates
- [ ] CRUD operations work
- [ ] Images load
- [ ] Error handling works
- [ ] Token refresh (if implemented)

### Deliverables
✅ Connected to backend
✅ All features working with real data
✅ Error handling
✅ Token management

---

## Best Practices

### Performance
1. **Lazy Loading**
   - Images: loading="lazy"
   - Routes: React.lazy() + Suspense

2. **Optimization**
   - Debounce search input (300ms)
   - Memoize expensive calculations
   - Use React.memo for pure components

3. **Bundle Size**
   - Tree-shaking enabled
   - Remove unused dependencies
   - Code splitting by route

### Accessibility
1. **Semantic HTML**
   - Use proper heading hierarchy
   - Form labels
   - Alt text for images

2. **ARIA Attributes**
   - aria-label for icon buttons
   - aria-live for dynamic content
   - role attributes

3. **Keyboard Navigation**
   - Tab order logical
   - Focus states visible
   - Escape key closes modals

### Code Quality
1. **Component Structure**
   - Small, single-responsibility components
   - Props validation with PropTypes
   - Clear naming conventions

2. **State Management**
   - Keep state close to usage
   - Lift state only when needed
   - Use Context for global state

3. **Error Handling**
   - Try-catch in async functions
   - Error boundaries for components
   - User-friendly error messages

---

## Testing Strategy

### Manual Testing
1. **User Flows**
   - Search → Filter → View Shop → Back
   - Admin: Login → Add Shop → Add Product → Edit → Delete
   - Theme toggle on all pages

2. **Edge Cases**
   - Empty search results
   - Shop with no products
   - Invalid shop ID
   - Login with wrong credentials
   - Form validation errors

3. **Cross-Browser**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)

### Automated Testing (Optional)
1. **Unit Tests**
   - Component rendering
   - Props handling
   - State updates

2. **Integration Tests**
   - API calls
   - User interactions
   - Navigation

3. **E2E Tests**
   - Critical user journeys
   - Admin workflows

---

## Deployment Checklist

### Pre-Deployment
- [ ] Switch USE_MOCK_DATA to false
- [ ] Update REACT_APP_BACKEND_URL
- [ ] Test all features with real backend
- [ ] Check console for errors/warnings
- [ ] Run build: `yarn build`
- [ ] Test production build locally

### Build Optimization
- [ ] Minification enabled
- [ ] Source maps generated
- [ ] Environment variables set
- [ ] Assets optimized (images, fonts)

### Post-Deployment
- [ ] Test on production URL
- [ ] Check mobile responsiveness
- [ ] Verify SSL certificate
- [ ] Monitor error logs
- [ ] Test all critical flows

---

## Troubleshooting

### Common Issues

1. **Theme not persisting**
   - Check localStorage.setItem() calls
   - Verify useEffect dependencies

2. **API calls failing**
   - Check REACT_APP_BACKEND_URL
   - Verify CORS configuration
   - Check network tab in DevTools

3. **Images not loading**
   - Verify image URLs
   - Check CORS for external images
   - Test image URLs in browser

4. **Animations janky**
   - Check for layout thrashing
   - Use transform instead of top/left
   - Enable GPU acceleration: transform: translateZ(0)

5. **Build errors**
   - Clear node_modules and reinstall
   - Check for conflicting dependencies
   - Update React and other packages

---

## Success Metrics

### User Experience
- Page load time < 3 seconds
- Time to interactive < 5 seconds
- Smooth 60fps animations
- Zero layout shifts

### Code Quality
- ESLint: 0 errors
- Bundle size < 500KB (gzipped)
- Lighthouse score > 90
- Accessibility score > 95

### Functionality
- All user flows working
- All admin operations successful
- Error handling robust
- Responsive on all devices

---

## Conclusion

This frontend workflow provides a complete, production-ready implementation of the Sector-17 Store marketplace. The architecture is modular, maintainable, and easily extensible for future features.

**Key Achievements:**
- ✅ Modern React architecture
- ✅ Beautiful UI with Tailwind + Framer Motion
- ✅ Light/Dark theme support
- ✅ Mock data for development
- ✅ Easy backend integration
- ✅ Admin dashboard with CRUD
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Accessible
- ✅ Production-ready

**Next Steps:**
1. Review and test the frontend
2. Connect to backend API
3. Deploy to production
4. Monitor and iterate based on user feedback
