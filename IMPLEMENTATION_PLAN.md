# Sector-17 Store - Implementation Plan

## Project Overview
A local marketplace discovery platform for Sector-17 Market, Chandigarh. Users can search products and shops (Zomato-style), while admins manage inventory.

---

## PHASE 1: FRONTEND FOUNDATION (5-6 Credits)

### Goals
- Project setup with React + Tailwind CSS
- Theme system (Light/Dark mode)
- Mock data structure
- API service layer (works with both mock and real backend)
- Core layout components

### Tasks
1. **Setup & Configuration**
   - Install dependencies: framer-motion, lucide-react
   - Configure Tailwind with custom design tokens
   - Setup Google Fonts: Outfit (headings) + Plus Jakarta Sans (body)
   - Create ThemeContext for light/dark mode

2. **Design System**
   - Update index.css with Blue (#2563EB) & Orange (#F97316) color scheme
   - Define CSS variables for light/dark themes
   - Create neutral gray backgrounds (Slate-50 / Slate-900)
   - Setup shadow system and border radius

3. **Mock Data Structure**
   - Create `/utils/mockData.js` with:
     - Categories array
     - Shops array (6 shops with all details)
     - Products array (15+ products with shop references)
     - Admin users array
   - Match exact structure that backend will return

4. **API Service Layer**
   - Create `/services/api.js` with USE_MOCK_DATA flag
   - Implement methods: searchProducts, getShops, getShopById, getCategories
   - All methods return Promises (same as real API calls)
   - Easy switching between mock and real backend

5. **Core Components**
   - Navbar: Logo, navigation, theme toggle, admin link
   - ThemeToggle: Sun/Moon icon button with smooth transition
   - Footer (optional for Phase 2)

### Deliverables
- ✅ Working theme toggle (light/dark)
- ✅ Mock data ready
- ✅ API service layer ready for backend integration
- ✅ Core layout components

### Testing
- Theme persistence in localStorage
- Mock API delays (simulate real network)
- Console logs for data flow

---

## PHASE 2: HOME PAGE & SEARCH (5-6 Credits)

### Goals
- Beautiful home page with hero section
- Zomato-style search functionality
- Filter panel (category, price, shop)
- Product and shop card components
- Smooth animations

### Tasks
1. **Home Page Layout**
   - Hero section with gradient background
   - Large centered search bar (floating design)
   - View toggle: Products / Shops
   - Grid layout with sidebar filters

2. **Search Component**
   - SearchBar: Large input with search icon
   - Real-time search (debounced)
   - Search across products AND shops
   - Display "Results for..." with count

3. **Filter Panel**
   - Category dropdown (all categories)
   - Shop dropdown (all shops)
   - Price range: dual sliders (min/max)
   - Reset filters button
   - Sticky positioning on scroll

4. **Card Components**
   - ProductCard:
     - Image with hover scale effect
     - Product name, shop name (clickable), price
     - Category badge
     - Shopping bag icon on hover
   - ShopCard:
     - Shop image with hover effect
     - Shop name, category, description
     - Address, contact info
     - "View Products" CTA button

5. **Animations**
   - Framer Motion page transitions
   - Card entrance animations (stagger)
   - Hover effects: scale, shadow, translate-y
   - Smooth filter updates
   - Loading spinner

### Deliverables
- ✅ Fully functional home page
- ✅ Search works across products and shops
- ✅ Filters work (category, shop, price)
- ✅ Beautiful card designs with animations
- ✅ Responsive grid layouts

### Testing
- Search for "Shoes" - shows shoe products
- Search for "Gupta Garments" - shows shop products
- Filter by category - updates results
- Price range filtering
- View mode toggle (Products/Shops)

---

## PHASE 3: SHOP DETAILS PAGE (5-6 Credits)

### Goals
- Detailed shop page
- Display all products from that shop
- Beautiful layout with shop info
- Breadcrumb navigation

### Tasks
1. **Shop Details Layout**
   - Hero image banner (shop image)
   - Shop info card: name, category, description
   - Contact details: address, phone
   - Back to home link

2. **Products Grid**
   - Display all products from this shop
   - Same ProductCard component
   - 4-column grid on desktop
   - Empty state: "No products available"

3. **Routing**
   - Route: `/shop/:shopId`
   - Get shopId from URL params
   - Fetch shop and products via API
   - Handle 404: Shop not found

4. **Animations**
   - Page transition (fade + slide)
   - Shop info card slides up
   - Products grid stagger animation

### Deliverables
- ✅ Shop details page with full info
- ✅ All products displayed in grid
- ✅ Navigation: Home ↔ Shop Details
- ✅ Smooth page transitions

### Testing
- Click shop card from home → navigates to shop details
- Click shop name from product card → navigates to shop
- Back button works
- Shop with no products shows empty state

---

## PHASE 4: ADMIN LOGIN & DASHBOARD (5-6 Credits)

### Goals
- Admin login page with authentication
- Admin dashboard with stats
- Protected routes (PrivateRoute component)
- JWT token handling

### Tasks
1. **Admin Login Page**
   - Route: `/admin`
   - Beautiful centered login form
   - Email and password inputs
   - Lock icon, form validation
   - Demo credentials displayed
   - Login API call (mock JWT token)

2. **Authentication Flow**
   - Store JWT token in localStorage
   - PrivateRoute component: checks token
   - Redirect to login if not authenticated
   - Logout button in navbar (admin routes only)

3. **Admin Dashboard**
   - Route: `/admin/dashboard`
   - Stats cards: Total Shops, Total Products, Categories
   - Large action cards:
     - Manage Shops (link to `/admin/shops`)
     - Manage Products (link to `/admin/products`)
   - Modern "Control Room" design

4. **Navigation**
   - Navbar shows "Logout" on admin routes
   - Dashboard links to management pages

### Deliverables
- ✅ Admin login working (mock auth)
- ✅ Dashboard with stats
- ✅ Protected routes
- ✅ Token persistence

### Testing
- Login with demo credentials: admin@sector17.com / admin123
- Token stored in localStorage
- Access `/admin/dashboard` without login → redirects to login
- Logout → clears token and redirects to home

---

## PHASE 5: MANAGE SHOPS (ADMIN) (5-6 Credits)

### Goals
- CRUD operations for shops
- Add, edit, delete shops
- Form with all shop fields
- Beautiful admin UI

### Tasks
1. **Shop Management Page**
   - Route: `/admin/shops`
   - "Add Shop" button (top right)
   - Grid of shop cards (admin view)
   - Edit and Delete buttons on each card

2. **Add/Edit Form**
   - Toggleable form (slides down)
   - Fields: name, category, description, address, contact, image_url
   - Form validation (all required)
   - Submit → API call → refresh list
   - Cancel button → close form

3. **Delete Functionality**
   - Delete button with confirmation dialog
   - "Are you sure?" alert
   - Delete API call → refresh list

4. **API Integration**
   - addShop(shopData)
   - updateShop(shopId, shopData)
   - deleteShop(shopId)
   - All with JWT token in headers

5. **UI/UX**
   - Form animations (slide in/out)
   - Toast notifications (success/error)
   - Loading states
   - Optimistic UI updates

### Deliverables
- ✅ Add new shop with form
- ✅ Edit existing shop
- ✅ Delete shop with confirmation
- ✅ Toast notifications
- ✅ Form validation

### Testing
- Add shop → appears in list
- Edit shop → changes reflected
- Delete shop → removed from list
- Form validation works (empty fields)
- Toast messages appear

---

## PHASE 6: MANAGE PRODUCTS (ADMIN) (5-6 Credits)

### Goals
- CRUD operations for products
- Assign products to shops
- Product management interface

### Tasks
1. **Product Management Page**
   - Route: `/admin/products`
   - "Add Product" button
   - Grid of product cards (4 columns)
   - Edit and Delete buttons

2. **Add/Edit Form**
   - Fields: name, description, price, category, image_url, shop (dropdown)
   - Shop dropdown: select from all shops
   - Price input: number with ₹ symbol
   - Auto-populate shop_name from selected shop

3. **Delete Functionality**
   - Delete with confirmation
   - Remove from list

4. **API Integration**
   - addProduct(productData)
   - updateProduct(productId, productData)
   - deleteProduct(productId)
   - getShops() for dropdown

5. **UI/UX**
   - Compact product cards
   - Price formatting (₹1,299)
   - Category badges
   - Shop name displayed

### Deliverables
- ✅ Add new product
- ✅ Assign product to shop
- ✅ Edit product details
- ✅ Delete product
- ✅ Shop dropdown working

### Testing
- Add product → assigned to selected shop
- Edit product → shop can be changed
- Delete product → removed from shop and search
- Price formatting correct
- Product appears in shop details page

---

## PHASE 7: BACKEND SETUP (5-6 Credits)

### Goals
- MySQL database setup
- FastAPI backend structure
- Database models
- Connection to MySQL

### Tasks
1. **Database Setup**
   - Install MySQL connector: `pip install mysql-connector-python pymysql SQLAlchemy`
   - Create database: `sector17_store`
   - Run schema.sql file (creates all tables)

2. **FastAPI Models**
   - Create `/app/backend/models.py`:
     - User (admin)
     - Shop
     - Product
     - Category
   - Use SQLAlchemy ORM
   - Define relationships (Shop has many Products)

3. **Database Connection**
   - Create `/app/backend/database.py`
   - Connection pool setup
   - Get MySQL URL from .env
   - Test connection

4. **Environment Variables**
   - Add to `/app/backend/.env`:
     - MYSQL_HOST=localhost
     - MYSQL_PORT=3306
     - MYSQL_USER=root
     - MYSQL_PASSWORD=your_password
     - MYSQL_DATABASE=sector17_store
     - JWT_SECRET=your_secret_key

5. **Initial Data Seeding**
   - Create seed script: `seed_data.py`
   - Insert categories, shops, products from mock data
   - Run once to populate database

### Deliverables
- ✅ MySQL database created
- ✅ All tables created (users, shops, products, categories)
- ✅ FastAPI connected to MySQL
- ✅ Models defined
- ✅ Sample data inserted

### Testing
- Connection test: FastAPI starts without errors
- MySQL queries work
- Check tables in MySQL Workbench or CLI
- Verify sample data exists

---

## PHASE 8: BACKEND API - PUBLIC ROUTES (5-6 Credits)

### Goals
- Public API endpoints
- Search functionality
- Shops and products endpoints
- CORS setup

### Tasks
1. **API Routes Structure**
   - `/api/products/search` - GET (with query params)
   - `/api/products` - GET
   - `/api/shops` - GET
   - `/api/shops/:id` - GET
   - `/api/categories` - GET

2. **Search Endpoint**
   - `/api/products/search?q=shoes&category=Footwear&shop=Shop+Name&minPrice=0&maxPrice=5000`
   - Full-text search on product name, description
   - Filter by category, shop, price range
   - Join with shops table to include shop_name
   - Return paginated results

3. **Products Endpoints**
   - GET `/api/products` - list all products with shop info
   - Include shop_name in response (JOIN query)
   - Order by created_at DESC

4. **Shops Endpoints**
   - GET `/api/shops` - list all shops
   - GET `/api/shops/:id` - shop details + all products
   - Include product count

5. **Categories Endpoint**
   - GET `/api/categories` - list all categories
   - Simple query

6. **Response Format**
   - Consistent JSON format:
     ```json
     {
       "success": true,
       "data": [...]
     }
     ```
   - Error handling:
     ```json
     {
       "success": false,
       "error": "Error message"
     }
     ```

### Deliverables
- ✅ All public endpoints working
- ✅ Search with filters works
- ✅ Products include shop info
- ✅ Shop details include products
- ✅ CORS configured

### Testing
- curl commands for all endpoints
- Test search with various filters
- Verify JSON response format
- Check CORS headers

---

## PHASE 9: BACKEND API - ADMIN ROUTES (5-6 Credits)

### Goals
- Admin authentication (JWT)
- Protected CRUD endpoints
- File upload for images (local storage)

### Tasks
1. **Authentication**
   - POST `/api/auth/login` - email + password
   - Hash password check (bcrypt)
   - Generate JWT token
   - Return token + user info

2. **JWT Middleware**
   - Create `auth_middleware.py`
   - Verify JWT token in Authorization header
   - Decode token → get user
   - Protect admin routes

3. **Shops CRUD (Protected)**
   - POST `/api/shops` - create shop (JWT required)
   - PUT `/api/shops/:id` - update shop (JWT required)
   - DELETE `/api/shops/:id` - delete shop (JWT required)
   - Also delete associated products (cascade)

4. **Products CRUD (Protected)**
   - POST `/api/products` - create product (JWT required)
   - PUT `/api/products/:id` - update product (JWT required)
   - DELETE `/api/products/:id` - delete product (JWT required)
   - Validate shop_id exists

5. **Image Upload (Optional)**
   - POST `/api/upload` - upload image
   - Save to `/app/backend/uploads/`
   - Return image URL
   - Or continue using external URLs

6. **Validation**
   - Pydantic models for request validation
   - Check required fields
   - Price validation (positive number)
   - Email format validation

### Deliverables
- ✅ Admin login working
- ✅ JWT authentication
- ✅ All CRUD endpoints protected
- ✅ Input validation
- ✅ Error handling

### Testing
- Login → get JWT token
- Create shop without token → 401 Unauthorized
- Create shop with token → success
- Update/delete operations work
- Invalid data → validation errors

---

## PHASE 10: FRONTEND-BACKEND INTEGRATION (5-6 Credits)

### Goals
- Connect frontend to real backend
- Switch from mock data to API calls
- Handle loading states and errors
- End-to-end testing

### Tasks
1. **API Service Update**
   - In `/services/api.js`, set `USE_MOCK_DATA = false`
   - All API methods now use real backend
   - Update BACKEND_URL from .env

2. **Error Handling**
   - Catch API errors
   - Display error toasts
   - Handle network errors
   - 401 → redirect to login
   - 404 → show not found page

3. **Loading States**
   - Show spinners during API calls
   - Disable buttons during submission
   - Skeleton loaders (optional)

4. **Image Upload Integration**
   - If image upload implemented:
     - Add file input to forms
     - Upload image → get URL → save in form
   - Otherwise: continue using image URLs

5. **Testing**
   - Test all user flows end-to-end
   - Search → filter → view shop → view products
   - Admin: login → add shop → add products → edit → delete
   - Light/dark theme works throughout

6. **Bug Fixes**
   - Fix any integration issues
   - Ensure data consistency
   - Handle edge cases

### Deliverables
- ✅ Frontend connected to backend
- ✅ All features working with real data
- ✅ Error handling implemented
- ✅ Loading states added
- ✅ End-to-end tested

### Testing
- Full user journey: search → filter → shop details
- Admin journey: login → manage shops → manage products
- Test error scenarios (network failure, 404, etc.)
- Theme persistence across pages

---

## PHASE 11: POLISH & OPTIMIZATION (3-4 Credits)

### Goals
- Performance optimization
- Responsive design fixes
- Accessibility improvements
- Final testing

### Tasks
1. **Performance**
   - Lazy load images
   - Optimize bundle size
   - Add pagination (if many products)
   - Debounce search input

2. **Responsive Design**
   - Test on mobile, tablet, desktop
   - Fix any layout issues
   - Touch-friendly buttons
   - Mobile menu (if needed)

3. **Accessibility**
   - All buttons have labels
   - Images have alt text
   - Keyboard navigation works
   - Focus states visible
   - Color contrast (WCAG AA)

4. **Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Test dark mode in all browsers
   - Fix any browser-specific issues

5. **Documentation**
   - Update README.md
   - Setup instructions
   - Environment variables
   - API documentation

### Deliverables
- ✅ Optimized performance
- ✅ Fully responsive
- ✅ Accessible
- ✅ Cross-browser compatible
- ✅ Documentation complete

---

## Summary

### Frontend Phases (1-6): ~30-36 Credits
- Complete UI with mock data
- Light/Dark theme
- Search & filters
- Admin dashboard
- All CRUD interfaces

### Backend Phases (7-9): ~15-18 Credits
- MySQL database
- FastAPI with all endpoints
- Authentication
- Protected routes

### Integration & Polish (10-11): ~8-10 Credits
- Connect frontend to backend
- Testing & optimization

### Total Estimate: ~53-64 Credits

---

## Current Status
✅ **COMPLETED: Frontend Phases 1-6** (Mock data implementation)
- All components created
- Pages functional
- API service layer ready
- Mock data working
- Light/Dark theme implemented
- Animations added

⏳ **PENDING: Backend Phases 7-9**
- MySQL database setup
- FastAPI backend implementation
- API endpoints

⏳ **PENDING: Integration Phase 10**
- Connect frontend to backend

⏳ **PENDING: Polish Phase 11**
- Final testing and optimization

---

## Next Steps

1. **Review current frontend implementation**
2. **Run schema.sql to create MySQL database**
3. **Start Backend Phase 7: Database Setup**
4. **Implement Backend Phase 8: Public API Routes**
5. **Implement Backend Phase 9: Admin API Routes**
6. **Switch frontend to use real backend**
7. **Final testing and deployment**
