
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, User, Order } from '@/types';
import { mockProducts } from '@/data/mockData';

type StoreState = {
  products: Product[];
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  isLoading: boolean;
};

type StoreAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_LOADING'; payload: boolean };

type StoreContextType = {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  login: (user: User) => void;
  logout: () => void;
  checkout: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialState: StoreState = {
  products: [],
  cart: [],
  user: null,
  orders: [],
  isLoading: false,
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, { product, quantity }] };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === id ? { ...item, quantity } : item
        )
      };
    }
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as CartItem[];
      parsedCart.forEach(item => {
        dispatch({ 
          type: 'ADD_TO_CART', 
          payload: { product: item.product, quantity: item.quantity } 
        });
      });
    }
    
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }

    // Load initial products
    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const login = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  const checkout = () => {
    // Create a new order from the current cart
    if (state.cart.length === 0 || !state.user) return;
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: state.user.id,
      items: [...state.cart],
      totalAmount: state.cart.reduce(
        (total, item) => total + item.product.price * item.quantity, 
        0
      ),
      status: 'processing',
      createdAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        login,
        logout,
        checkout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
