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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* BACK */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT IMAGE */}
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src={product.images?.[0] || "/placeholder-product.jpg"}
                alt={product.title}
                fill
                className="object-cover"
              />

              {/* wishlist */}
              <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full border border-slate-200 hover:bg-orange-500 hover:text-white transition">
                <Heart size={18} />
              </button>

              {/* category */}
              <span className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                {product.category}
              </span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-5">
            {/* TITLE */}
            <h1 className="text-3xl font-bold text-slate-900">
              {product.title}
            </h1>

            {/* PRICE */}
            <h2 className="text-4xl font-bold text-orange-600">
              $ {product.price.toLocaleString()}
            </h2>

            {/* CONDITION + STATUS */}
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                {product.condition}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  product.status === "available"
                    ? "bg-green-100 text-green-600 border border-green-200"
                    : "bg-red-100 text-red-600 border border-red-200"
                }`}
              >
                {product.status}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-2">
              <Link
                href={`/checkout/${product._id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium shadow-md transition"
              >
                <ShoppingCart size={18} />
                Buy Now
              </Link>

              <button className="p-3 border border-slate-200 rounded-xl hover:border-orange-500 hover:text-orange-500 transition">
                <Heart size={18} />
              </button>
            </div>

            {/* SELLER CARD */}
            <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h3 className="text-sm text-slate-500 mb-3">
                Seller Information
              </h3>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {product.sellerInfo?.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {product.sellerInfo?.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {product.sellerInfo?.email}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-2">
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
