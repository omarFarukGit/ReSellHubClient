import { getProducts } from "@/lib/api/products";
import ProductListingContainer from "../products/ProductListingContainer";

const FetureProducts = async () => {
  const res = await getProducts({});
  const products = res?.data?.slice(0, 8) || [];

  return (
    <div className="relative min-h-screen overflow-hidden ">
      {/* Background Effects */}

      {/* Content */}
      <div className="relative z-10 px-4 py-8 md:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm text-orange-300">
            ResellHub Marketplace
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Explore Feture
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              {" "}
              Products
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400 text-lg">
            Discover quality second-hand products from trusted sellers at
            affordable prices.
          </p>
        </div>

        {/* Products */}
        <ProductListingContainer products={products} />
      </div>
    </div>
  );
};

export default FetureProducts;
