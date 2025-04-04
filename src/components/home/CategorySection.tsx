
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: '/placeholder.svg',
    description: 'Latest gadgets and tech',
    productCount: 42
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: '/placeholder.svg',
    description: 'Furniture and decor',
    productCount: 38
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: '/placeholder.svg',
    description: 'Clothing and accessories',
    productCount: 56
  },
  {
    id: 'health',
    name: 'Health & Beauty',
    image: '/placeholder.svg',
    description: 'Personal care products',
    productCount: 29
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <Link to="/categories" className="text-brand-primary flex items-center hover:underline">
            View all categories <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/80 text-xs font-medium px-2 py-1 rounded-full">
                    {category.productCount} products
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-brand-primary transition-colors">{category.name}</h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <span className="text-brand-primary flex items-center text-sm font-medium">
                    Browse category <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
