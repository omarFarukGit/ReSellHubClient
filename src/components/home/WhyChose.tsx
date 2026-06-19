"use client";

import {
  ShieldCheck,
  Zap,
  Users,
  MessageCircle,
  BadgeCheck,
  Rocket,
} from "lucide-react";

const features = [
  {
    title: "Secure Transactions",
    desc: "Safe and trusted buying & selling experience.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Listing",
    desc: "Post your product in just a few seconds.",
    icon: Zap,
  },
  {
    title: "Large Community",
    desc: "Connect with thousands of active users daily.",
    icon: Users,
  },
  {
    title: "Direct Chat",
    desc: "Communicate directly with buyers and sellers.",
    icon: MessageCircle,
  },
  {
    title: "Verified Users",
    desc: "Verified profiles increase trust and safety.",
    icon: BadgeCheck,
  },
  {
    title: "Grow Fast",
    desc: "Sell faster with better visibility and reach.",
    icon: Rocket,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose Resellhub
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-6 rounded-2xl border bg-gray-50 hover:bg-white hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 mb-4">
                  <Icon className="w-6 h-6 text-orange-500" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
