"use client";

import { Product } from "@/types/product";
import ProductCard from "./productCard";

interface ProductListingContainerProps {
  products: Product[];
}

const ProductListingContainer = ({
  products,
}: ProductListingContainerProps) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductListingContainer;
