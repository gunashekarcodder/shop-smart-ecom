
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-block bg-white/80 px-4 py-1 rounded-full text-brand-primary text-sm font-medium mb-6">
              🎉 Summer sale is on! Get 25% off with code SUMMER25
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Shop Smart, <span className="text-brand-primary">Live Better</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Discover the latest technology, fashion, and home essentials with our
              curated collection of premium products at competitive prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="group">
                  Shop Now 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Browse Categories
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center mt-10 space-x-8">
              <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">10k+</span>
                <span className="text-gray-500 text-sm">Products</span>
              </div>
              <div className="h-10 border-r border-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">5k+</span>
                <span className="text-gray-500 text-sm">Happy Customers</span>
              </div>
              <div className="h-10 border-r border-gray-200"></div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-2xl">99%</span>
                <span className="text-gray-500 text-sm">Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Shopping items"
                  className="rounded-xl shadow-2xl relative z-10 max-w-lg mx-auto"
                />
                
                {/* Sale tag */}
                <div className="absolute -right-5 top-5 bg-red-500 text-white py-2 px-4 rounded-lg transform rotate-12 z-20 shadow-lg">
                  <p className="text-sm font-bold">UP TO</p>
                  <p className="text-2xl font-bold">50% OFF</p>
                </div>
                
                {/* Trust badges */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl px-6 py-3 z-20 flex gap-4">
                  <div className="flex items-center">
                    <div className="mr-2 text-brand-primary">🔒</div>
                    <div className="text-xs">Secure Payment</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 text-brand-primary">🚚</div>
                    <div className="text-xs">Free Shipping</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 text-brand-primary">↩️</div>
                    <div className="text-xs">Easy Returns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
