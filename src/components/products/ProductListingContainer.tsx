"use client";

import { IProduct } from "@/types/product";
import ProductCard from "./productCard";

interface ProductListingContainerProps {
  products: IProduct[];
}

const ProductListingContainer = ({
  products,
}: ProductListingContainerProps) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductListingContainer;
