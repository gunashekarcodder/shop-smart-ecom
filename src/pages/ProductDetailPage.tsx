
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Star, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import ProductGrid from '@/components/products/ProductGrid';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { state, addToCart } = useStore();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = state.products.find(p => p.id === productId);
  
  // Get related products (same category)
  const relatedProducts = state.products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} ${quantity === 1 ? 'item' : 'items'} added to your cart.`,
    });
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="mb-4 border rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Thumbnail Images (mock) */}
            <div className="flex space-x-2">
              {[0, 1, 2].map(index => (
                <button
                  key={index}
                  className={`border rounded-md overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-brand-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-20 h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="mb-2">
              <span className="text-brand-secondary text-sm font-medium">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} rating
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.price > 100 && (
                <span className="ml-2 text-sm text-brand-secondary">
                  Free shipping
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-8">
              {product.description}
            </p>
            
            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <div className="flex items-center border rounded-md overflow-hidden mr-4">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-grow"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
            
            {/* Features */}
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-3 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">
                    On orders over $100. Otherwise flat rate of $10.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-3 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">2-Year Warranty</h4>
                  <p className="text-sm text-gray-500">
                    Full coverage for manufacturing defects.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 mr-3 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-gray-500">
                    Return for any reason within 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
