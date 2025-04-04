
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/contexts/StoreContext';

const OrderConfirmationPage = () => {
  const { state } = useStore();
  const orders = state.orders;
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          {latestOrder && (
            <div className="mb-8">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Order Number:</span>
                  <span>{latestOrder.id}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>
                    {new Date(latestOrder.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span>${latestOrder.totalAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span className="capitalize">{latestOrder.status}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">Items Ordered</h3>
                <div className="space-y-4">
                  {latestOrder.items.map(item => (
                    <div key={item.product.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.product.name}</span>
                        <span className="text-gray-500 block text-sm">
                          Quantity: {item.quantity}
                        </span>
                      </div>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              A confirmation email has been sent to your email address.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
