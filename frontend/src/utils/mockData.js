export const categories = [
  { id: '1', name: 'Clothing' },
  { id: '2', name: 'Electronics' },
  { id: '3', name: 'Food' },
  { id: '4', name: 'Books' },
  { id: '5', name: 'Footwear' },
  { id: '6', name: 'Accessories' },
  { id: '7', name: 'Home Decor' }
];

export const shops = [
  {
    id: '1',
    name: 'Gupta Garments',
    category: 'Clothing',
    description: 'Premium ethnic and western wear for all occasions. Family-owned business since 1985.',
    address: 'Shop 15, Sector-17, Chandigarh',
    contact: '+91-9876543210',
    image_url: 'https://images.unsplash.com/photo-1571854003494-ab1b14c21249?w=800'
  },
  {
    id: '2',
    name: 'Tech Galaxy',
    category: 'Electronics',
    description: 'Latest gadgets, smartphones, and electronics at competitive prices.',
    address: 'Shop 22, Sector-17, Chandigarh',
    contact: '+91-9876543211',
    image_url: 'https://images.unsplash.com/photo-1660224319984-4af12c1a469b?w=800'
  },
  {
    id: '3',
    name: 'Sharma Sweets',
    category: 'Food',
    description: 'Traditional Indian sweets and snacks. Famous for our ladoos and barfis.',
    address: 'Shop 8, Sector-17, Chandigarh',
    contact: '+91-9876543212',
    image_url: 'https://images.unsplash.com/photo-1640720707320-af5502f2a3f5?w=800'
  },
  {
    id: '4',
    name: 'Book Haven',
    category: 'Books',
    description: 'Vast collection of fiction, non-fiction, and academic books.',
    address: 'Shop 31, Sector-17, Chandigarh',
    contact: '+91-9876543213',
    image_url: 'https://images.unsplash.com/photo-1740064038378-b3b049c98c39?w=800'
  },
  {
    id: '5',
    name: 'Footwear Palace',
    category: 'Footwear',
    description: 'Branded shoes, sandals, and sports footwear for men, women, and kids.',
    address: 'Shop 19, Sector-17, Chandigarh',
    contact: '+91-9876543214',
    image_url: 'https://images.unsplash.com/photo-1571854003494-ab1b14c21249?w=800'
  },
  {
    id: '6',
    name: 'Style Studio',
    category: 'Accessories',
    description: 'Trendy accessories including bags, watches, jewelry, and sunglasses.',
    address: 'Shop 27, Sector-17, Chandigarh',
    contact: '+91-9876543215',
    image_url: 'https://images.unsplash.com/photo-1660224319984-4af12c1a469b?w=800'
  }
];

export const products = [
  {
    id: '1',
    name: 'Cotton Kurta Set',
    description: 'Comfortable cotton kurta with matching pajama. Perfect for summer.',
    price: 1499,
    category: 'Clothing',
    image_url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    shop_id: '1',
    shop_name: 'Gupta Garments'
  },
  {
    id: '2',
    name: 'Silk Saree',
    description: 'Elegant silk saree with traditional border work.',
    price: 3999,
    category: 'Clothing',
    image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    shop_id: '1',
    shop_name: 'Gupta Garments'
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Premium sound quality with active noise cancellation.',
    price: 2999,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1590658165737-15a047b7a0b8?w=500',
    shop_id: '2',
    shop_name: 'Tech Galaxy'
  },
  {
    id: '4',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage and 48MP camera.',
    price: 24999,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    shop_id: '2',
    shop_name: 'Tech Galaxy'
  },
  {
    id: '5',
    name: 'Kaju Katli (500g)',
    description: 'Premium cashew sweets made with pure ghee.',
    price: 450,
    category: 'Food',
    image_url: 'https://images.unsplash.com/photo-1640720707320-af5502f2a3f5?w=500',
    shop_id: '3',
    shop_name: 'Sharma Sweets'
  },
  {
    id: '6',
    name: 'Gulab Jamun Box',
    description: 'Soft and delicious gulab jamuns, pack of 12.',
    price: 180,
    category: 'Food',
    image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500',
    shop_id: '3',
    shop_name: 'Sharma Sweets'
  },
  {
    id: '7',
    name: 'The Great Gatsby',
    description: 'Classic novel by F. Scott Fitzgerald.',
    price: 299,
    category: 'Books',
    image_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500',
    shop_id: '4',
    shop_name: 'Book Haven'
  },
  {
    id: '8',
    name: 'Atomic Habits',
    description: 'Bestselling self-help book by James Clear.',
    price: 450,
    category: 'Books',
    image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500',
    shop_id: '4',
    shop_name: 'Book Haven'
  },
  {
    id: '9',
    name: 'Running Shoes',
    description: 'Lightweight sports shoes with excellent grip.',
    price: 2499,
    category: 'Footwear',
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    shop_id: '5',
    shop_name: 'Footwear Palace'
  },
  {
    id: '10',
    name: 'Casual Sneakers',
    description: 'Trendy sneakers for everyday wear.',
    price: 1799,
    category: 'Footwear',
    image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    shop_id: '5',
    shop_name: 'Footwear Palace'
  },
  {
    id: '11',
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots.',
    price: 899,
    category: 'Accessories',
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    shop_id: '6',
    shop_name: 'Style Studio'
  },
  {
    id: '12',
    name: 'Designer Sunglasses',
    description: 'UV protection sunglasses with polarized lenses.',
    price: 1299,
    category: 'Accessories',
    image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    shop_id: '6',
    shop_name: 'Style Studio'
  },
  {
    id: '13',
    name: 'Formal Shirt',
    description: 'Premium quality formal shirt for office wear.',
    price: 1199,
    category: 'Clothing',
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
    shop_id: '1',
    shop_name: 'Gupta Garments'
  },
  {
    id: '14',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with 12-hour battery life.',
    price: 1899,
    category: 'Electronics',
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    shop_id: '2',
    shop_name: 'Tech Galaxy'
  },
  {
    id: '15',
    name: 'Samosa (6 pcs)',
    description: 'Crispy samosas filled with spiced potatoes.',
    price: 60,
    category: 'Food',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
    shop_id: '3',
    shop_name: 'Sharma Sweets'
  }
];

export const adminUsers = [
  {
    email: 'admin@sector17.com',
    password: 'admin123'
  }
];