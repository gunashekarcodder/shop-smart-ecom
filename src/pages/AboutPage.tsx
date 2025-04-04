
import React from 'react';
import Layout from '@/components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="mb-4">
            Welcome to ShopSmart, your one-stop destination for all your shopping needs. 
            We pride ourselves on offering quality products at competitive prices.
          </p>
          <p className="mb-4">
            Founded in 2023, ShopSmart has quickly grown to become a trusted name in online retail. 
            Our mission is to provide a seamless shopping experience with exceptional customer service.
          </p>
          <p>
            We value your feedback and are constantly working to improve our services. 
            Thank you for choosing ShopSmart!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
