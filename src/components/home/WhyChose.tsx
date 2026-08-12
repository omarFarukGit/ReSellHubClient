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
    <section
      className="
        w-full
        bg-white
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
              dark:text-orange-400
            "
          >
            Why Resellhub?
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
            Why Choose Resellhub
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
            Everything you need for a simple, secure and reliable
            second-hand marketplace experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group
                  rounded-2xl
                  border
                  border-gray-200
                  bg-gray-50
                  p-6
                  transition-all duration-300

                  hover:-translate-y-1
                  hover:border-orange-200
                  hover:bg-white
                  hover:shadow-lg

                  dark:border-gray-800
                  dark:bg-gray-900
                  dark:hover:border-orange-500/30
                  dark:hover:bg-gray-900
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-4
                    flex
                    h-12
                    w-12
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
                      h-6
                      w-6
                      text-orange-500
                      transition-colors duration-300
                      dark:text-orange-400
                    "
                  />
                </div>

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
                  {item.title}
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
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;