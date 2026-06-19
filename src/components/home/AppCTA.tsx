"use client";

import { Smartphone, DownloadCloud } from "lucide-react";

const AppCTA = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="text-white max-w-xl">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Buy & Sell Anytime, Anywhere
            </h2>

            <p className="text-white/90 text-sm md:text-base mb-6">
              Download the Resellhub app and start selling your products faster.
              Get instant notifications, chat with buyers, and manage everything
              easily.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-white text-orange-600 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
                <DownloadCloud className="w-5 h-5" />
                Download App
              </button>

              <button className="flex items-center gap-2 border border-white text-white px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-white text-center">
            <Smartphone className="w-16 h-16 mx-auto mb-4" />

            <h3 className="text-xl font-semibold mb-2">Mobile Experience</h3>

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
