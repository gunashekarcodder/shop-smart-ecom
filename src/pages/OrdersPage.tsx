
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useStore } from '@/contexts/StoreContext';
import { Button } from '@/components/ui/button';
import { PackageOpen, ShoppingBag } from 'lucide-react';

const OrdersPage = () => {
  const { state } = useStore();
  const { user, orders } = state;
  
  // Filter orders for the current user
  const userOrders = user 
    ? orders.filter(order => order.userId === user.id)
    : [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        {!user ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Please log in</h2>
            <p className="text-gray-500 mb-6">
              You need to be logged in to view your orders.
            </p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        ) : userOrders.length > 0 ? (
          <div className="space-y-6">
            {userOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b">
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-start">
                      <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="mb-6 flex justify-center">
              <PackageOpen className="h-20 w-20 text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-8">
              You haven't placed any orders yet. Start shopping to place an order.
            </p>
            <Link to="/products">
              <Button>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
