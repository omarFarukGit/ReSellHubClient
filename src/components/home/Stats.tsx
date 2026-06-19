"use client";

const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Products Listed", value: "25K+" },
  { label: "Successful Sales", value: "8K+" },
  { label: "Verified Sellers", value: "3K+" },
];

const StatsSection = () => {
  return (
    <section className="w-full py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {stats.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border bg-gray-50 hover:bg-white hover:shadow-md transition"
            >
              {/* Value */}
              <h3 className="text-3xl md:text-4xl font-bold text-orange-500">
                {item.value}
              </h3>

              {/* Label */}
              <p className="text-sm text-gray-600 mt-2">
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