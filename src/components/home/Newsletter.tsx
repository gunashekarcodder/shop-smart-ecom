
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (!email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      console.log('Subscribing email:', email);
      
      toast({
        title: 'Subscription Successful!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-primary/80 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-3 rounded-full">
              <Mail className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-8 opacity-90">
            Stay updated with the latest products, exclusive offers, and shopping tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-grow"
              required
              disabled={loading}
            />
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <p>✓ No spam, only new products and discounts</p>
            <p>✓ Unsubscribe anytime</p>
            <p>✓ Weekly newsletter</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
