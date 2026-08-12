"use client";

import { Smartphone, DownloadCloud } from "lucide-react";

const AppCTA = () => {
  return (
    <section
      className="
        w-full py-16
        bg-gradient-to-r from-orange-500 to-orange-600
        dark:from-orange-600 dark:to-orange-700
        transition-colors duration-300
      "
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          {/* Left Content */}
          <div className="max-w-xl text-white">
            <h2 className="mb-4 text-2xl font-bold md:text-4xl">
              Buy & Sell Anytime, Anywhere
            </h2>

            <p className="mb-6 text-sm text-white/90 md:text-base">
              Download the Resellhub app and start selling your products
              faster. Get instant notifications, chat with buyers, and manage
              everything easily.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Download Button */}
              <button
                className="
                  flex items-center gap-2
                  rounded-xl
                  bg-white
                  px-5 py-3
                  font-semibold
                  text-orange-600
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-gray-100
                  hover:shadow-md

                  dark:bg-gray-950
                  dark:text-orange-400
                  dark:hover:bg-gray-900
                "
              >
                <DownloadCloud className="h-5 w-5" />
                Download App
              </button>

              {/* Learn More Button */}
              <button
                className="
                  flex items-center gap-2
                  rounded-xl
                  border border-white/80
                  px-5 py-3
                  font-semibold
                  text-white
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  hover:text-orange-600
                  
                  dark:border-white/60
                  dark:hover:bg-gray-950
                  dark:hover:text-orange-400
                "
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div
            className="
              w-full max-w-sm
              rounded-2xl
              border border-white/20
              bg-white/10
              p-8
              text-center text-white
              shadow-lg
              backdrop-blur-md
              transition-all duration-300
              hover:bg-white/15
              hover:shadow-xl

              dark:border-white/10
              dark:bg-black/20
              dark:hover:bg-black/30
            "
          >
            <Smartphone className="mx-auto mb-4 h-16 w-16" />

            <h3 className="mb-2 text-xl font-semibold">
              Mobile Experience
            </h3>

            <p className="text-sm text-white/80">
              Faster browsing, instant chat & easy selling in your pocket.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppCTA;