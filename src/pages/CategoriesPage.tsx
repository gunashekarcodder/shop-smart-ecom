
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Using the same category data from CategorySection component
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
  },
  {
    id: 'books',
    name: 'Books & Stationery',
    image: '/placeholder.svg',
    description: 'Books, journals and office supplies',
    productCount: 35
  },
  {
    id: 'sports',
    name: 'Sports & Outdoor',
    image: '/placeholder.svg',
    description: 'Equipment for sports and outdoor activities',
    productCount: 31
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    image: '/placeholder.svg',
    description: 'Entertainment for all ages',
    productCount: 27
  },
  {
    id: 'automotive',
    name: 'Automotive',
    image: '/placeholder.svg',
    description: 'Car accessories and parts',
    productCount: 19
  }
];

const CategoriesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop by Categories</h1>
          <p className="text-gray-600">Browse our wide selection of products across various categories</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className="text-brand-primary flex items-center text-sm font-medium">
                    Browse category <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
