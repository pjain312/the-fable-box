import React from 'react';
import { products } from '../data/products';
import { useCategory } from '../context/CategoryContext';
import ProductCard from './ProductCard';

const ProductList = () => {
  const { selectedCategory } = useCategory();

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-xl">No products found in this category</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;

