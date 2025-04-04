
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import CategorySection from '@/components/home/CategorySection';
import Newsletter from '@/components/home/Newsletter';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <Newsletter />
    </Layout>
  );
};

export default HomePage;
