
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
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
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        {product.featured && (
          <span className="absolute top-2 left-2 bg-brand-accent text-white text-xs px-2 py-1 rounded">
            Featured
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold px-3 py-1 rounded">Out of Stock</span>
          </div>
        )}
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </Link>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-1 mb-2">
          {product.rating && (
            <>
              <Star className="h-4 w-4 fill-brand-accent text-brand-accent" />
              <span className="text-sm font-medium">{product.rating}</span>
            </>
          )}
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-lg mb-1 hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-2">
          {product.category}
        </p>
        
        <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
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
