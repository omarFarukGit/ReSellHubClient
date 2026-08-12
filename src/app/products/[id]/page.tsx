import Image from "next/image";
import { Heart, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { getProductById } from "@/lib/api/products";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await getProductById(id);
  const product = res?.data;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 md:p-12">
      <div className="mx-auto max-w-6xl">
        {/* BACK */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-slate-500 transition hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-400"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Image
                src={product.images?.[0] || "/placeholder-product.jpg"}
                alt={product.title}
                fill
                className="object-cover"
              />

              {/* wishlist */}
              <button className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white/90 p-2 transition hover:bg-orange-500 hover:text-white dark:border-slate-700 dark:bg-slate-900/90">
                <Heart size={18} />
              </button>

              {/* category */}
              <span className="absolute left-4 top-4 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/50 dark:text-orange-400">
                {product.category}
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-5">
            {/* TITLE */}
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {product.title}
            </h1>

            {/* PRICE */}
            <h2 className="text-4xl font-bold text-orange-600 dark:text-orange-400">
              $ {product.price.toLocaleString()}
            </h2>

            {/* CONDITION + STATUS */}
            <div className="flex gap-2">
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400">
                {product.condition}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  product.status === "available"
                    ? "border border-green-200 bg-green-100 text-green-600 dark:border-green-900/50 dark:bg-green-950/40 dark:text-green-400"
                    : "border border-red-200 bg-red-100 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
                }`}
              >
                {product.status}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {product.description}
            </p>

            {/* ACTIONS */}
            <div className="mt-2 flex gap-3">
              <Link
                href={`/checkout/${product._id}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-medium text-white shadow-md transition hover:bg-orange-600 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                <ShoppingCart size={18} />
                Buy Now
              </Link>

              <button className="rounded-xl border border-slate-200 p-3 transition hover:border-orange-500 hover:text-orange-500 dark:border-slate-700 dark:hover:border-orange-400 dark:hover:text-orange-400">
                <Heart size={18} />
              </button>
            </div>

            {/* SELLER CARD */}
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                Seller Information
              </h3>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                  {product.sellerInfo?.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {product.sellerInfo?.name}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {product.sellerInfo?.email}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                📞 {product.sellerInfo?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;