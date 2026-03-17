import type { ProjectConfig, GeneratedFile } from '../types';

export function generateEcommerce(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isNext = config.framework === 'nextjs';
  const isMui = config.styling === 'mui';

  // Main page
  const mainPage = isNext ? 'src/app/page.tsx' : 'src/App.tsx';
  files.push({
    path: mainPage,
    language: 'tsx',
    content: isNext
      ? `import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ProductGrid from '@/components/ProductGrid';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
        Welcome to ${config.projectName}
      </Typography>
      <ProductGrid />
    </Container>
  );
}
`
      : `import ProductGrid from './components/ProductGrid';

export default function App() {
  return (
    <div>
      <h1>${config.projectName}</h1>
      <ProductGrid />
    </div>
  );
}
`,
  });

  // Product types
  files.push({
    path: 'src/types/product.ts',
    language: 'typescript',
    content: `export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}
`,
  });

  // Product Grid component
  files.push({
    path: 'src/components/ProductGrid.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // TODO: Fetch from API
    setProducts([
      { id: '1', name: 'Premium Headphones', description: 'Wireless noise-cancelling headphones', price: 199.99, image: '/products/headphones.jpg', category: 'Electronics', inStock: true, quantity: 50 },
      { id: '2', name: 'Mechanical Keyboard', description: 'RGB mechanical gaming keyboard', price: 149.99, image: '/products/keyboard.jpg', category: 'Electronics', inStock: true, quantity: 30 },
      { id: '3', name: 'Laptop Stand', description: 'Ergonomic aluminum laptop stand', price: 49.99, image: '/products/stand.jpg', category: 'Accessories', inStock: true, quantity: 100 },
    ]);
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
`
      : `'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/product';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      { id: '1', name: 'Premium Headphones', description: 'Wireless headphones', price: 199.99, image: '', category: 'Electronics', inStock: true, quantity: 50 },
      { id: '2', name: 'Mechanical Keyboard', description: 'Gaming keyboard', price: 149.99, image: '', category: 'Electronics', inStock: true, quantity: 30 },
    ]);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
`,
  });

  // Product Card
  files.push({
    path: 'src/components/ProductCard.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const handleAddToCart = () => {
    // TODO: Dispatch add to cart action
    console.log('Add to cart:', product.id);
  };

  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="h5" color="primary" fontWeight={700}>
          \${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          fullWidth
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardActions>
    </Card>
  );
}
`
      : `'use client';

import type { Product } from '../types/product';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>\${product.price.toFixed(2)}</p>
      <button onClick={() => console.log('Add to cart:', product.id)} disabled={!product.inStock}>
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
}
`,
  });

  // Cart store / context
  if (config.features.includes('shopping-cart')) {
    if (config.stateManagement === 'zustand') {
      files.push({
        path: 'src/store/cartStore.ts',
        language: 'typescript',
        content: `import { create } from 'zustand';
import type { Product, CartItem } from '@/types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) => set((state) => {
    const existing = state.items.find((i) => i.product.id === product.id);
    if (existing) {
      return { items: state.items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
    }
    return { items: [...state.items, { product, quantity: 1 }] };
  }),

  removeItem: (productId) => set((state) => ({
    items: state.items.filter((i) => i.product.id !== productId),
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    items: quantity <= 0
      ? state.items.filter((i) => i.product.id !== productId)
      : state.items.map((i) => i.product.id === productId ? { ...i, quantity } : i),
  })),

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
}));
`,
      });
    } else {
      files.push({
        path: 'src/store/cartSlice.ts',
        language: 'typescript',
        content: `import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, CartItem } from '@/types/product';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find((i) => i.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.product.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
export default cartSlice.reducer;
`,
      });
    }
  }

  // API route for products
  if (isNext) {
    files.push({
      path: 'src/app/api/products/route.ts',
      language: 'typescript',
      content: `import { NextResponse } from 'next/server';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Premium Headphones', description: 'Wireless noise-cancelling headphones', price: 199.99, image: '/products/headphones.jpg', category: 'Electronics', inStock: true, quantity: 50 },
  { id: '2', name: 'Mechanical Keyboard', description: 'RGB mechanical gaming keyboard', price: 149.99, image: '/products/keyboard.jpg', category: 'Electronics', inStock: true, quantity: 30 },
  { id: '3', name: 'Laptop Stand', description: 'Ergonomic aluminum laptop stand', price: 49.99, image: '/products/stand.jpg', category: 'Accessories', inStock: true, quantity: 100 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let products = MOCK_PRODUCTS;
  if (category) {
    products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  return NextResponse.json({ products });
}
`,
    });
  }

  return files;
}
