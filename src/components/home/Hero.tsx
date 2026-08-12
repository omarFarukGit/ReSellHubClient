import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="
        relative
        flex
        min-h-[80vh]
        items-center
        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/banner/resellhub-banner.png')",
      }}
    >
      {/* Light Mode Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-white/40
          transition-colors duration-300
          dark:bg-black/55
        "
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          {/* Badge */}
          <span
            className="
              inline-block
              rounded-full
              border
              border-orange-200
              bg-orange-100
              px-5 py-2
              text-sm
              font-medium
              text-orange-600
              shadow-sm

              dark:border-orange-500/30
              dark:bg-orange-500/15
              dark:text-orange-300
            "
          >
            🚀 Buy Smart • Sell Easy
          </span>

          {/* Heading */}
          <h1
            className="
              mt-6
              text-5xl
              font-bold
              leading-tight
              text-slate-900
              transition-colors duration-300

              dark:text-white

              md:text-6xl
            "
          >
            Your Ultimate
            <span
              className="
                block
                text-[#FF6B00]
                dark:text-orange-400
              "
            >
              Reselling Partner
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-xl
              text-lg
              text-slate-700
              transition-colors duration-300

              dark:text-gray-200
            "
          >
            Discover quality products, trusted sellers, and amazing deals all in
            one marketplace.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            {/* Shop Now */}
            <Link href="/products">
              <button
                className="
                  cursor-pointer
                  rounded-xl
                  bg-[#FF6B00]
                  px-8 py-4
                  font-semibold
                  text-white
                  shadow-md
                  transition-all duration-300

                  hover:-translate-y-0.5
                  hover:bg-[#e65f00]
                  hover:shadow-lg

                  dark:bg-orange-500
                  dark:hover:bg-orange-400
                "
              >
                Shop Now
              </button>
            </Link>

            {/* Learn More */}
            <button
              className="
                cursor-pointer
                rounded-xl
                border
                border-gray-200
                bg-white/80
                px-8 py-4
                font-semibold
                text-gray-800
                backdrop-blur-sm
                transition-all duration-300

                hover:-translate-y-0.5
                hover:bg-white
                hover:shadow-md

                dark:border-white/20
                dark:bg-gray-900/70
                dark:text-white
                dark:hover:bg-gray-800
              "
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
