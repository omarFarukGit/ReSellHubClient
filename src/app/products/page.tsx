import ProductListingContainer from "@/components/products/ProductListingContainer";
import { getProducts } from "@/lib/api/products";

const ProductsPage = async () => {
  const res = await getProducts();
  const products = res?.data || [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-orange-950/20 to-black text-white">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute top-1/2 right-0 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-amber-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 px-4 py-8 md:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-sm text-orange-300">
            ResellHub Marketplace
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Explore Amazing
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

export default ProductsPage;
