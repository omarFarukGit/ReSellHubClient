import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/banner/resellhub-banner.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-orange-100 px-5 py-2 text-sm font-medium text-orange-600">
            🚀 Buy Smart • Sell Easy
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-tight text-slate-900">
            Your Ultimate
            <span className="block text-[#FF6B00]">Reselling Partner</span>
          </h1>

          <p className="mt-6 text-lg text-slate-700">
            Discover quality products, trusted sellers, and amazing deals all in
            one marketplace.
          </p>

          <div className="mt-10 flex gap-4">
            <Link href={"/products"}>
              <button className="rounded-xl bg-[#FF6B00] px-8 py-4 text-white font-semibold hover:bg-[#e65f00] transition cursor-pointer">
                Shop Now
              </button>
            </Link>

            <button className="rounded-xl border bg-white/80 px-8 py-4 font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
