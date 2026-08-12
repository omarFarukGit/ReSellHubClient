import { getProducts } from "@/lib/api/products";
import ProductListingContainer from "../products/ProductListingContainer";

const FetureProducts = async () => {
  const res = await getProducts({});
  const products = res?.data?.slice(0, 8) || [];

  return (
    <section
      className="
        relative min-h-screen
        overflow-hidden
        bg-white
        transition-colors duration-300

        dark:bg-gray-950
      "
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orange Glow */}
        <div
          className="
            absolute
            -left-20 -top-20
            h-72 w-72
            rounded-full
            bg-orange-500/5
            blur-3xl
            dark:bg-orange-500/10
          "
        />

        <div
          className="
            absolute
            -bottom-20 -right-20
            h-72 w-72
            rounded-full
            bg-amber-500/5
            blur-3xl
            dark:bg-amber-500/10
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-12 md:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-7xl">
          {/* Badge */}
          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-orange-500/30
              bg-orange-500/10
              px-4 py-1
              text-sm
              font-medium
              text-orange-600

              dark:text-orange-300
            "
          >
            ResellHub Marketplace
          </span>

          {/* Heading */}
          <h1
            className="
              mt-4
              text-4xl
              font-bold
              tracking-tight
              text-gray-900

              dark:text-white

              md:text-5xl
            "
          >
            Explore Feature
            <span
              className="
                bg-gradient-to-r
                from-orange-500
                to-amber-500
                bg-clip-text
                text-transparent

                dark:from-orange-400
                dark:to-amber-300
              "
            >
              {" "}
              Products
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-3
              max-w-2xl
              text-lg
              text-gray-600

              dark:text-zinc-400
            "
          >
            Discover quality second-hand products from trusted sellers at
            affordable prices.
          </p>
        </div>

        {/* Products */}
        <ProductListingContainer products={products} />
      </div>
    </section>
  );
};

export default FetureProducts;
