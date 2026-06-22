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
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-400 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT SIDE IMAGE */}
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-zinc-800">
              <Image
                src={product.images?.[0] || "/placeholder-product.jpg"}
                alt={product.title}
                fill
                className="object-cover"
              />

              {/* Wishlist */}
              <button className="absolute top-4 right-4 bg-zinc-900/70 p-2 rounded-full border border-zinc-700 hover:bg-orange-500 transition">
                <Heart size={18} />
              </button>

              {/* Category Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                {product.category}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="flex flex-col gap-5">
            {/* Title */}
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Price */}
            <h2 className="text-4xl font-bold text-blue-400">
              ৳ {product.price.toLocaleString()}
            </h2>

            {/* Condition */}
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {product.condition}
              </span>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  product.status === "available"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {product.status}
              </span>
            </div>

            {/* Description */}
            <p className="text-zinc-400 leading-relaxed">
              {product.description}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-2">
              <Link href={`/checkout/${product._id}`} className=" flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium">
                < >
                  <ShoppingCart size={18} />
                  Buy Now
                </>
              </Link>

              <button className="p-3 border border-zinc-700 rounded-xl hover:border-orange-500 hover:text-orange-400 transition">
                <Heart size={18} />
              </button>
            </div>

            {/* SELLER CARD (like your image) */}
            <div className="mt-6 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
              <h3 className="text-sm text-zinc-400 mb-3">Seller Information</h3>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold">
                  {product.sellerInfo?.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold">{product.sellerInfo?.name}</p>
                  <p className="text-xs text-zinc-400">
                    {product.sellerInfo?.email}
                  </p>
                </div>
              </div>

              <p className="text-xs text-zinc-500 mt-2">
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
