
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: '/placeholder.svg',
    description: 'Latest gadgets and tech'
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: '/placeholder.svg',
    description: 'Furniture and decor'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: '/placeholder.svg',
    description: 'Clothing and accessories'
  },
  {
    id: 'health',
    name: 'Health & Beauty',
    image: '/placeholder.svg',
    description: 'Personal care products'
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
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
