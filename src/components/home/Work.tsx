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
        {/* Title */}
        <div className="mb-10 text-center">
          <span
            className="
              text-sm
              font-semibold
              uppercase
              tracking-wider
              text-orange-500
            "
          >
            Simple & Easy
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
            How It Works
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
            Buy and sell second-hand products easily with Resellhub.
            Just follow these simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  p-6
                  text-center
                  shadow-sm
                  transition-all duration-300

                  hover:-translate-y-1
                  hover:border-orange-200
                  hover:shadow-lg

                  dark:border-gray-800
                  dark:bg-gray-900
                  dark:hover:border-orange-500/30
                  dark:hover:bg-gray-900
                  dark:hover:shadow-xl
                "
              >
                {/* Icon */}
                <div
                  className="
                    mx-auto
                    mb-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-orange-100
                    transition-all duration-300

                    group-hover:scale-110
                    group-hover:bg-orange-200

                    dark:bg-orange-500/10
                    dark:group-hover:bg-orange-500/20
                  "
                >
                  <Icon
                    className="
                      h-7
                      w-7
                      text-orange-500
                      transition-transform duration-300
                      dark:text-orange-400
                    "
                  />
                </div>

                {/* Step Number */}
                <p
                  className="
                    mb-2
                    text-sm
                    font-semibold
                    text-orange-500
                    dark:text-orange-400
                  "
                >
                  Step {index + 1}
                </p>

                {/* Title */}
                <h3
                  className="
                    mb-2
                    text-lg
                    font-semibold
                    text-gray-800
                    transition-colors

                    dark:text-white
                  "
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    text-sm
                    leading-6
                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;