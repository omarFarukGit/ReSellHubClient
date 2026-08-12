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
    <section
      className="
        w-full
        bg-gray-50
        py-14
        transition-colors duration-300
        dark:bg-gray-950
      "
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <span
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-orange-500
              dark:text-orange-400
            "
          >
            Testimonials
          </span>

          <h2
            className="
              mt-2
              text-2xl
              font-bold
              text-gray-800
              transition-colors
              dark:text-white
              md:text-3xl
            "
          >
            What Our Users Say
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            See what buyers and sellers are saying about their
            Resellhub experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="
                group
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-6
                shadow-sm
                transition-all duration-300

                hover:-translate-y-1
                hover:border-orange-200
                hover:shadow-lg

                dark:border-gray-800
                dark:bg-gray-900
                dark:hover:border-orange-500/30
                dark:hover:bg-gray-900
              "
            >
              {/* Stars */}
              <div
                className="
                  mb-4
                  flex gap-1
                  text-orange-500
                  dark:text-orange-400
                "
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                ))}
              </div>

              {/* Comment */}
              <p
                className="
                  mb-6
                  text-sm
                  leading-6
                  text-gray-600
                  dark:text-gray-300
                "
              >
                “{item.comment}”
              </p>

              {/* Divider */}
              <div className="mb-4 h-px bg-gray-100 dark:bg-gray-800" />

              {/* User Info */}
              <div>
                <h4
                  className="
                    font-semibold
                    text-gray-800
                    dark:text-white
                  "
                >
                  {item.name}
                </h4>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    text-orange-500
                    dark:text-orange-400
                  "
                >
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;