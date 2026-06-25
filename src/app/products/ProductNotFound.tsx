import Link from "next/link";

const ProductNotFound = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-orange-500">Product Not Found</h2>

      <p className="mt-2 text-zinc-400">
        No products found for this category or filter.
      </p>

      <Link
        href="/products"
        className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-white"
      >
        View All Products
      </Link>
    </div>
  );
};

export default ProductNotFound;
