
import React from 'react';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/common/Logo';

const CartSummary = () => {
  const { state, checkout } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const cartItems = state.cart;
  const user = state.user;
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to complete your purchase.',
        variant: 'destructive',
      });
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    if (cartItems.length === 0) {
      toast({
        title: 'Empty Cart',
        description: 'Your cart is empty. Add items before checking out.',
        variant: 'destructive',
      });
      return;
    }
    
    checkout();
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    navigate('/order-confirmation');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <Logo size="small" />
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
            {shipping === 0 && subtotal > 0 && (
              <span className="text-xs text-green-600 block">
                (Free shipping on orders over $100)
              </span>
            )}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Button
        onClick={handleCheckout}
        className="w-full"
        size="lg"
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </Button>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">We Accept</h3>
        <div className="flex space-x-2">
          <div className="bg-gray-200 text-xs p-2 rounded">Visa</div>
          <div className="bg-gray-200 text-xs p-2 rounded">Mastercard</div>
          <div className="bg-gray-200 text-xs p-2 rounded">PayPal</div>
          <div className="bg-gray-200 text-xs p-2 rounded">Apple Pay</div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
