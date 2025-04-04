
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/contexts/StoreContext';
import { useToast } from '@/hooks/use-toast';
import { mockAdminUser, mockCustomerUser } from '@/data/mockData';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      // Demo login logic (in a real app, this would be an API call)
      if (email === 'admin@example.com' && password === 'password') {
        login(mockAdminUser);
        toast({
          title: 'Welcome back, Admin!',
          description: 'You have successfully logged in.',
        });
        navigate(from);
      } else if (email === 'customer@example.com' && password === 'password') {
        login(mockCustomerUser);
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        navigate(from);
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Try admin@example.com / password or customer@example.com / password',
          variant: 'destructive',
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500 mt-2">Log in to access your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-sm text-brand-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <p className="text-sm text-gray-500 text-center mb-4">For demo purposes:</p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>Admin: admin@example.com / password</p>
          <p>Customer: customer@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
