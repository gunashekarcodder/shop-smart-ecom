
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { useStore } from '@/contexts/StoreContext';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { state } = useStore();
  
  // Filter products by the selected category
  const categoryProducts = state.products.filter(
    product => product.category.toLowerCase() === categoryId?.toLowerCase()
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {categoryId?.charAt(0).toUpperCase() + categoryId?.slice(1)}
          </h1>
          <p className="text-gray-600">
            {categoryProducts.length} products found in this category
          </p>
        </div>
        
        {categoryProducts.length > 0 ? (
          <ProductGrid products={categoryProducts} />
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600">No products found in this category</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
