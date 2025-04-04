
import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateCartQuantity } = useStore();
  const { product, quantity } = item;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateCartQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const increaseQuantity = () => {
    updateCartQuantity(product.id, quantity + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b">
      <div className="sm:w-24 flex-shrink-0 mb-4 sm:mb-0">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto rounded"
          />
        </Link>
      </div>

      <div className="sm:ml-6 flex-grow">
        <Link 
          to={`/product/${product.id}`}
          className="text-lg font-medium hover:text-brand-primary transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
      </div>

      <div className="flex items-center mt-4 sm:mt-0">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            onClick={decreaseQuantity}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 sm:mt-0 sm:ml-6 flex items-center justify-between sm:justify-end w-full sm:w-auto">
        <span className="font-medium text-lg">
          ${(product.price * quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(product.id)}
          className="ml-6 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
