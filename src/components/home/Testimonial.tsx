"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rakib Hasan",
    role: "Buyer",
    comment:
      "Resellhub is very easy to use. I bought a phone at a good price and the process was smooth.",
  },
  {
    name: "Nusrat Jahan",
    role: "Seller",
    comment:
      "I sold my old laptop within 2 days. The platform gives great visibility!",
  },
  {
    name: "Abdul Karim",
    role: "User",
    comment:
      "Very trusted marketplace. Direct chat system makes everything simple.",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          What Our Users Say
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              {/* Stars */}
              <div className="flex gap-1 text-orange-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm mb-4">{item.comment}</p>

              {/* User Info */}
              <div>
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
