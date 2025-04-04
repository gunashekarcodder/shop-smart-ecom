
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
  rating?: number;
  reviews?: Review[];
  discount?: number;
  reviewCount?: number;
  originalPrice?: number;
  brand?: string;
  specifications?: Record<string, string>;
  images?: string[];
  tags?: string[];
  weight?: string;
  dimensions?: string;
  warranty?: string;
  sku?: string;
  relatedProducts?: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  profilePicture?: string;
  phoneNumber?: string;
  addresses?: Address[];
  wishlist?: string[];
  orderHistory?: string[];
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  paymentMethod?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  discountApplied?: number;
  couponCode?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  expiryDate: string;
  usageLimit?: number;
  usedCount: number;
  applicableProducts?: string[];
  applicableCategories?: string[];
}
