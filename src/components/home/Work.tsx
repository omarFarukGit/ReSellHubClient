"use client";

import { UserPlus, Upload, ShoppingCart } from "lucide-react";

const steps = [
  {
    title: "Create Account",
    desc: "Sign up in seconds and join Resellhub marketplace.",
    icon: UserPlus,
  },
  {
    title: "Post Your Product",
    desc: "Upload product details, images and set your price easily.",
    icon: Upload,
  },
  {
    title: "Buy or Sell",
    desc: "Connect with buyers or sellers and complete your deal safely.",
    icon: ShoppingCart,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-10">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-orange-100 mb-4">
                  <Icon className="w-7 h-7 text-orange-500" />
                </div>

                {/* Step Number */}
                <p className="text-sm text-orange-500 font-semibold mb-2">
                  Step {index + 1}
                </p>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;