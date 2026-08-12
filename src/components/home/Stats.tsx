"use client";

const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Products Listed", value: "25K+" },
  { label: "Successful Sales", value: "8K+" },
  { label: "Verified Sellers", value: "3K+" },
];

const StatsSection = () => {
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
        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
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
              {/* Value */}
              <h3
                className="
                  text-3xl
                  font-bold
                  text-orange-500
                  transition-transform duration-300
                  group-hover:scale-105
                  dark:text-orange-400
                  md:text-4xl
                "
              >
                {item.value}
              </h3>

              {/* Label */}
              <p
                className="
                  mt-2
                  text-sm
                  text-gray-600
                  transition-colors
                  dark:text-gray-400
                "
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;