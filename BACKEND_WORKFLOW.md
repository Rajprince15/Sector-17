# Sector-17 Store - BACKEND WORKFLOW

## Overview
This document outlines the complete backend workflow for the Sector-17 Store marketplace application. The backend is built with FastAPI and MySQL database.

---

## Technology Stack

### Core
- **FastAPI 0.110.1** - Modern Python web framework
- **Python 3.10+** - Programming language
- **MySQL 8.0** - Relational database
- **SQLAlchemy** - ORM (Object-Relational Mapping)

### Authentication & Security
- **JWT (PyJWT)** - JSON Web Tokens
- **Bcrypt** - Password hashing
- **python-jose** - JWT encoding/decoding
- **passlib** - Password utilities

### Database
- **mysql-connector-python** - MySQL driver
- **pymysql** - Pure Python MySQL client
- **motor** - Async MongoDB driver (currently used)

### Utilities
- **python-dotenv** - Environment variables
- **uvicorn** - ASGI server
- **pydantic** - Data validation
- **python-multipart** - File uploads

---

## Project Structure

```
/app/backend/
├── models/                      # Database models (SQLAlchemy)
│   ├── __init__.py
│   ├── user.py                 # User/Admin model
│   ├── shop.py                 # Shop model
│   ├── product.py              # Product model
│   └── category.py             # Category model
│
├── routes/                      # API routes
│   ├── __init__.py
│   ├── auth.py                 # Authentication endpoints
│   ├── shops.py                # Shop CRUD endpoints
│   ├── products.py             # Product CRUD endpoints
│   └── categories.py           # Category endpoints
│
├── schemas/                     # Pydantic schemas
│   ├── __init__.py
│   ├── user.py                 # User schemas
│   ├── shop.py                 # Shop schemas
│   └── product.py              # Product schemas
│
├── middleware/                  # Custom middleware
│   ├── __init__.py
│   └── auth.py                 # JWT authentication middleware
│
├── utils/                       # Utility functions
│   ├── __init__.py
│   ├── password.py             # Password hashing utilities
│   ├── jwt.py                  # JWT token utilities
│   └── database.py             # Database connection
│
├── uploads/                     # Uploaded files (images)
│
├── server.py                    # Main application file
├── database.py                  # Database configuration
├── config.py                    # Configuration settings
├── requirements.txt             # Python dependencies
├── schema.sql                   # MySQL database schema
├── seed_data.py                 # Database seeding script
└── .env                        # Environment variables
```

---

## Phase 1: Database Setup (Day 1)

### 1.1 Install MySQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation

# macOS
brew install mysql
brew services start mysql

# Windows
# Download MySQL installer from mysql.com
```

### 1.2 Create Database
```bash
# Login to MySQL
mysql -u root -p

# Run the schema file
CREATE DATABASE sector17_store;
USE sector17_store;
SOURCE /app/backend/schema.sql;
```

Or copy-paste the schema:
```bash
mysql -u root -p < /app/backend/schema.sql
```

### 1.3 Verify Database
```sql
USE sector17_store;
SHOW TABLES;
-- Expected: categories, users, shops, products

SELECT COUNT(*) FROM shops;
-- Expected: 6 shops

SELECT COUNT(*) FROM products;
-- Expected: 15 products
```

### 1.4 Environment Variables
Update `/app/backend/.env`:
```env
# MySQL Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=sector17_store

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# CORS (keep existing)
CORS_ORIGINS=*

# MongoDB (can be removed if using MySQL only)
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
```

### Deliverables
✅ MySQL installed and running
✅ Database created with all tables
✅ Sample data inserted
✅ Environment variables configured

---

## Phase 2: Database Connection (Day 1)

### 2.1 Install Python Dependencies
```bash
cd /app/backend
pip install mysql-connector-python pymysql sqlalchemy python-jose[cryptography] passlib[bcrypt]
pip freeze > requirements.txt
```

### 2.2 Create Database Configuration
File: `/app/backend/database.py`

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# MySQL connection URL
MYSQL_USER = os.getenv('MYSQL_USER', 'root')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD', '')
MYSQL_HOST = os.getenv('MYSQL_HOST', 'localhost')
MYSQL_PORT = os.getenv('MYSQL_PORT', '3306')
MYSQL_DATABASE = os.getenv('MYSQL_DATABASE', 'sector17_store')

DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"

# Create engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=True  # Set to False in production
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### 2.3 Test Connection
File: `/app/backend/test_connection.py`

```python
from database import engine
from sqlalchemy import text

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ Database connection successful!")
        print(f"Result: {result.fetchone()}")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
```

Run test:
```bash
python test_connection.py
```

### Deliverables
✅ SQLAlchemy configured
✅ Database connection working
✅ Connection test passed

---

## Phase 3: Database Models (Day 2)

### 3.1 User Model
File: `/app/backend/models/user.py`

```python
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### 3.2 Category Model
File: `/app/backend/models/category.py`

```python
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
```

### 3.3 Shop Model
File: `/app/backend/models/shop.py`

```python
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Shop(Base):
    __tablename__ = "shops"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text)
    address = Column(String(500), nullable=False)
    contact = Column(String(20), nullable=False)
    image_url = Column(String(1000))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationship
    products = relationship("Product", back_populates="shop", cascade="all, delete-orphan")
```

### 3.4 Product Model
File: `/app/backend/models/product.py`

```python
from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    shop_id = Column(Integer, ForeignKey("shops.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text)
    price = Column(Numeric(10, 2), nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    image_url = Column(String(1000))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationship
    shop = relationship("Shop", back_populates="products")
```

### 3.5 Models __init__.py
File: `/app/backend/models/__init__.py`

```python
from .user import User
from .category import Category
from .shop import Shop
from .product import Product

__all__ = ["User", "Category", "Shop", "Product"]
```

### Deliverables
✅ All models defined
✅ Relationships established
✅ Indexes configured

---

## Phase 4: Pydantic Schemas (Day 2)

### 4.1 User Schemas
File: `/app/backend/schemas/user.py`

```python
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    token: str
    email: str
```

### 4.2 Shop Schemas
File: `/app/backend/schemas/shop.py`

```python
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ShopBase(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    address: str
    contact: str
    image_url: Optional[str] = None

class ShopCreate(ShopBase):
    pass

class ShopUpdate(ShopBase):
    pass

class ShopResponse(ShopBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ShopWithProducts(ShopResponse):
    products: List['ProductResponse'] = []
```

### 4.3 Product Schemas
File: `/app/backend/schemas/product.py`

```python
from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: Decimal
    category: str
    image_url: Optional[str] = None
    shop_id: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    shop_name: Optional[str] = None  # From join
    
    class Config:
        from_attributes = True
```

### Deliverables
✅ Request/Response schemas defined
✅ Validation rules set
✅ Type hints configured

---

## Phase 5: Utility Functions (Day 3)

### 5.1 Password Utilities
File: `/app/backend/utils/password.py`

```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against a hash"""
    return pwd_context.verify(plain_password, hashed_password)
```

### 5.2 JWT Utilities
File: `/app/backend/utils/jwt.py`

```python
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv('JWT_SECRET', 'your-secret-key')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')
JWT_EXPIRATION_HOURS = int(os.getenv('JWT_EXPIRATION_HOURS', 24))

def create_access_token(data: dict) -> str:
    """
    Create a JWT access token
    
    Args:
        data: Dictionary containing user data (email, user_id, etc.)
    
    Returns:
        Encoded JWT token string
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    """
    Verify and decode a JWT token
    
    Args:
        token: JWT token string
    
    Returns:
        Decoded token payload
    
    Raises:
        JWTError: If token is invalid or expired
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError as e:
        raise e
```

### Deliverables
✅ Password hashing working
✅ JWT token creation/verification
✅ Secure configuration

---

## Phase 6: Authentication Middleware (Day 3)

### 6.1 Auth Dependency
File: `/app/backend/middleware/auth.py`

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from jose import JWTError

from database import get_db
from utils.jwt import verify_token
from models import User

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:
    """
    Dependency to get the current authenticated user
    
    Args:
        credentials: Bearer token from request header
        db: Database session
    
    Returns:
        User object
    
    Raises:
        HTTPException: 401 if token is invalid or user not found
    """
    token = credentials.credentials
    
    try:
        payload = verify_token(token)
        email = payload.get("email")
        
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    user = db.query(User).filter(User.email == email).first()
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user"
        )
    
    return user
```

### Usage in Routes
```python
from middleware.auth import get_current_user
from models import User

@router.post("/shops")
async def create_shop(
    shop_data: ShopCreate,
    current_user: User = Depends(get_current_user),  # Protected route
    db: Session = Depends(get_db)
):
    # Only authenticated users can access this
    pass
```

### Deliverables
✅ JWT middleware working
✅ Protected routes implemented
✅ Token validation

---

## Phase 7: Authentication Routes (Day 4)

### 7.1 Auth Router
File: `/app/backend/routes/auth.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas.user import UserLogin, TokenResponse
from utils.password import verify_password
from utils.jwt import create_access_token

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/login", response_model=TokenResponse)
async def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    """
    Admin login endpoint
    
    Args:
        credentials: Email and password
        db: Database session
    
    Returns:
        JWT token and email
    
    Raises:
        HTTPException: 401 if credentials are invalid
    """
    # Find user by email
    user = db.query(User).filter(User.email == credentials.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive user account"
        )
    
    # Create JWT token
    token_data = {
        "email": user.email,
        "user_id": user.id
    }
    token = create_access_token(token_data)
    
    return {
        "token": token,
        "email": user.email
    }
```

### 7.2 Testing
```bash
# Using curl
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sector17.com",
    "password": "admin123"
  }'

# Expected response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "admin@sector17.com"
}
```

### Deliverables
✅ Login endpoint working
✅ Password verification
✅ JWT token generation
✅ Error handling

---

## Phase 8: Public Routes (Day 4-5)

### 8.1 Categories Router
File: `/app/backend/routes/categories.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Category

router = APIRouter(prefix="/api/categories", tags=["Categories"])

@router.get("/")
async def get_categories(db: Session = Depends(get_db)):
    """
    Get all categories
    
    Returns:
        List of categories
    """
    categories = db.query(Category).all()
    return {
        "success": True,
        "data": [
            {"id": c.id, "name": c.name}
            for c in categories
        ]
    }
```

### 8.2 Shops Router (Public)
File: `/app/backend/routes/shops.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models import Shop, Product, User
from schemas.shop import ShopResponse, ShopCreate, ShopUpdate, ShopWithProducts
from schemas.product import ProductResponse
from middleware.auth import get_current_user

router = APIRouter(prefix="/api/shops", tags=["Shops"])

# PUBLIC ENDPOINTS

@router.get("/")
async def get_all_shops(db: Session = Depends(get_db)):
    """
    Get all active shops
    
    Returns:
        List of shops
    """
    shops = db.query(Shop).filter(Shop.is_active == True).all()
    return {
        "success": True,
        "data": [
            ShopResponse.from_orm(shop).dict()
            for shop in shops
        ]
    }

@router.get("/{shop_id}")
async def get_shop_by_id(shop_id: int, db: Session = Depends(get_db)):
    """
    Get shop details with all products
    
    Args:
        shop_id: Shop ID
    
    Returns:
        Shop object with products array
    """
    shop = db.query(Shop).filter(Shop.id == shop_id, Shop.is_active == True).first()
    
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    # Get all products for this shop
    products = db.query(Product).filter(
        Product.shop_id == shop_id,
        Product.is_active == True
    ).all()
    
    # Build response
    shop_data = ShopResponse.from_orm(shop).dict()
    products_data = [ProductResponse.from_orm(p).dict() for p in products]
    
    return {
        "success": True,
        "data": {
            "shop": shop_data,
            "products": products_data
        }
    }

# PROTECTED ENDPOINTS (Admin only)

@router.post("/", response_model=ShopResponse)
async def create_shop(
    shop_data: ShopCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new shop (Admin only)
    """
    shop = Shop(**shop_data.dict())
    db.add(shop)
    db.commit()
    db.refresh(shop)
    
    return shop

@router.put("/{shop_id}", response_model=ShopResponse)
async def update_shop(
    shop_id: int,
    shop_data: ShopUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a shop (Admin only)
    """
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    for key, value in shop_data.dict().items():
        setattr(shop, key, value)
    
    db.commit()
    db.refresh(shop)
    
    return shop

@router.delete("/{shop_id}")
async def delete_shop(
    shop_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a shop (Admin only)
    Cascade deletes all products
    """
    shop = db.query(Shop).filter(Shop.id == shop_id).first()
    
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    db.delete(shop)
    db.commit()
    
    return {"success": True, "message": "Shop deleted successfully"}
```

### 8.3 Products Router
File: `/app/backend/routes/products.py`

```python
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import Optional

from database import get_db
from models import Product, Shop, User
from schemas.product import ProductResponse, ProductCreate, ProductUpdate
from middleware.auth import get_current_user

router = APIRouter(prefix="/api/products", tags=["Products"])

# PUBLIC ENDPOINTS

@router.get("/search")
async def search_products(
    q: Optional[str] = Query(None, description="Search query"),
    category: Optional[str] = Query(None, description="Filter by category"),
    shop: Optional[str] = Query(None, description="Filter by shop name"),
    minPrice: Optional[float] = Query(None, description="Minimum price"),
    maxPrice: Optional[float] = Query(None, description="Maximum price"),
    db: Session = Depends(get_db)
):
    """
    Search products with filters
    
    Zomato-style search across product name, description, and shop name
    """
    # Base query with JOIN to get shop_name
    query = db.query(
        Product,
        Shop.name.label('shop_name')
    ).join(Shop, Product.shop_id == Shop.id).filter(
        Product.is_active == True,
        Shop.is_active == True
    )
    
    # Search query (product name, description, or shop name)
    if q:
        search_term = f"%{q}%"
        query = query.filter(
            or_(
                Product.name.like(search_term),
                Product.description.like(search_term),
                Shop.name.like(search_term)
            )
        )
    
    # Category filter
    if category and category != 'all':
        query = query.filter(Product.category == category)
    
    # Shop filter
    if shop and shop != 'all':
        query = query.filter(Shop.name == shop)
    
    # Price range filter
    if minPrice is not None:
        query = query.filter(Product.price >= minPrice)
    if maxPrice is not None:
        query = query.filter(Product.price <= maxPrice)
    
    # Execute query
    results = query.all()
    
    # Build response
    products_data = []
    for product, shop_name in results:
        product_dict = ProductResponse.from_orm(product).dict()
        product_dict['shop_name'] = shop_name
        products_data.append(product_dict)
    
    return {
        "success": True,
        "data": products_data
    }

@router.get("/")
async def get_all_products(db: Session = Depends(get_db)):
    """
    Get all active products with shop names
    """
    results = db.query(
        Product,
        Shop.name.label('shop_name')
    ).join(Shop, Product.shop_id == Shop.id).filter(
        Product.is_active == True,
        Shop.is_active == True
    ).all()
    
    products_data = []
    for product, shop_name in results:
        product_dict = ProductResponse.from_orm(product).dict()
        product_dict['shop_name'] = shop_name
        products_data.append(product_dict)
    
    return {
        "success": True,
        "data": products_data
    }

# PROTECTED ENDPOINTS (Admin only)

@router.post("/", response_model=ProductResponse)
async def create_product(
    product_data: ProductCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Create a new product (Admin only)
    """
    # Verify shop exists
    shop = db.query(Shop).filter(Shop.id == product_data.shop_id).first()
    if not shop:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shop not found"
        )
    
    product = Product(**product_data.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    
    return product

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    product_data: ProductUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update a product (Admin only)
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Verify shop exists if changing shop_id
    if product_data.shop_id != product.shop_id:
        shop = db.query(Shop).filter(Shop.id == product_data.shop_id).first()
        if not shop:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Shop not found"
            )
    
    for key, value in product_data.dict().items():
        setattr(product, key, value)
    
    db.commit()
    db.refresh(product)
    
    return product

@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a product (Admin only)
    """
    product = db.query(Product).filter(Product.id == product_id).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    db.delete(product)
    db.commit()
    
    return {"success": True, "message": "Product deleted successfully"}
```

### Deliverables
✅ All public endpoints working
✅ Search with filters
✅ Shop CRUD (admin protected)
✅ Product CRUD (admin protected)
✅ Category endpoints

---

## Phase 9: Main Application (Day 6)

### 9.1 Update server.py
File: `/app/backend/server.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path

# Import routes
from routes import auth, shops, products, categories

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create FastAPI app
app = FastAPI(
    title="Sector-17 Store API",
    description="Backend API for Sector-17 Market, Chandigarh",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(shops.router)
app.include_router(products.router)
app.include_router(categories.router)

# Root endpoint
@app.get("/api")
async def root():
    return {
        "message": "Sector-17 Store API",
        "version": "1.0.0",
        "status": "running"
    }

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=True
    )
```

### 9.2 Start Server
```bash
cd /app/backend
python server.py

# Or using uvicorn directly
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### 9.3 Test Endpoints
```bash
# Health check
curl http://localhost:8001/api/health

# Get all shops
curl http://localhost:8001/api/shops/

# Search products
curl "http://localhost:8001/api/products/search?q=shoes"

# Get categories
curl http://localhost:8001/api/categories/

# Admin login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sector17.com","password":"admin123"}'

# Create shop (with token)
curl -X POST http://localhost:8001/api/shops/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Test Shop",
    "category": "Electronics",
    "description": "Test description",
    "address": "Test address",
    "contact": "+91-1234567890",
    "image_url": "https://example.com/image.jpg"
  }'
```

### Deliverables
✅ Server running
✅ All routes registered
✅ CORS configured
✅ API documentation available at `/docs`

---

## Phase 10: Testing & Deployment (Day 7)

### 10.1 API Testing Checklist

**Public Endpoints:**
- [ ] GET `/api/shops/` - List all shops
- [ ] GET `/api/shops/{id}` - Get shop with products
- [ ] GET `/api/products/` - List all products
- [ ] GET `/api/products/search` - Search with filters
- [ ] GET `/api/categories/` - List categories

**Authentication:**
- [ ] POST `/api/auth/login` - Login with correct credentials
- [ ] POST `/api/auth/login` - Login with wrong credentials (401)
- [ ] Access protected route without token (401)

**Admin Endpoints (with token):**
- [ ] POST `/api/shops/` - Create shop
- [ ] PUT `/api/shops/{id}` - Update shop
- [ ] DELETE `/api/shops/{id}` - Delete shop
- [ ] POST `/api/products/` - Create product
- [ ] PUT `/api/products/{id}` - Update product
- [ ] DELETE `/api/products/{id}` - Delete product

### 10.2 Update requirements.txt
```bash
cd /app/backend
pip freeze > requirements.txt
```

### 10.3 Production Checklist
- [ ] Environment variables set properly
- [ ] Database optimized (indexes, query performance)
- [ ] JWT_SECRET changed from default
- [ ] CORS origins restricted (not *)
- [ ] Logging configured
- [ ] Error handling comprehensive
- [ ] API rate limiting (optional)
- [ ] SSL/TLS configured (HTTPS)
- [ ] Database backups configured

### Deliverables
✅ All endpoints tested
✅ Error handling verified
✅ Production ready

---

## API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc

---

## Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
sudo systemctl status mysql

# Test connection
mysql -u root -p -e "USE sector17_store; SELECT COUNT(*) FROM shops;"

# Check .env file has correct credentials
cat /app/backend/.env | grep MYSQL
```

### Import Errors
```bash
# Reinstall dependencies
cd /app/backend
pip install -r requirements.txt
```

### CORS Errors
```python
# In server.py, ensure:
allow_origins=["*"]  # For development
allow_origins=["http://localhost:3000"]  # For production
```

### JWT Token Issues
```python
# Verify JWT_SECRET is set
import os
from dotenv import load_dotenv
load_dotenv()
print(os.getenv('JWT_SECRET'))
```

---

## Success Criteria

✅ MySQL database connected
✅ All models and schemas defined
✅ Authentication working (JWT)
✅ All CRUD endpoints functional
✅ Search with filters working
✅ Protected routes secure
✅ Error handling robust
✅ API documentation generated
✅ Frontend can connect successfully
✅ Production ready

---

## Conclusion

The backend is now complete and production-ready. All endpoints are functional, secure, and well-documented. The API follows RESTful principles and provides a solid foundation for the Sector-17 Store marketplace.

**Next Steps:**
1. Connect frontend to this backend
2. Test end-to-end flows
3. Deploy to production
4. Monitor and maintain
