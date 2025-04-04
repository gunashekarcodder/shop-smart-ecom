
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group relative">
      <div className="relative">
        {product.featured && (
          <span className="absolute top-2 left-2 bg-brand-accent text-white text-xs px-2 py-1 rounded-full z-10">
            Featured
          </span>
        )}
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
            {product.discount}% OFF
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="text-white font-semibold px-3 py-1 rounded">Out of Stock</span>
          </div>
        )}
        <Link to={`/product/${product.id}`} className="block overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform group-hover:scale-110 duration-500"
          />
        </Link>
        
        {/* Quick action buttons */}
        <div className="absolute right-2 top-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full shadow-md"
            title="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Link to={`/product/${product.id}`}>
            <Button 
              size="icon" 
              variant="secondary" 
              className="h-8 w-8 rounded-full shadow-md"
              title="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          {product.rating && (
            <>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
              {product.reviewCount && (
                <span className="text-xs text-gray-500">({product.reviewCount})</span>
              )}
            </>
          )}
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-brand-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-2">
          {product.category}
        </p>
        
        <div className="flex items-center gap-2">
          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
