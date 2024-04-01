const AnalyticsCard = ({ number, description }) => {
  return (
    <div className="rounded-lg shadow p-8 border border-slate-200 bg-white">
      <div className="text-3xl font-bold text-zinc-950 mb-2">{number}</div>
      <div className="text-gray-600 mb-2">{description}</div>
    </div>
  );
};

// Example usage in a parent React component
export const AnalyticsGrid = ({ data }) => {
  const formatter = Intl.NumberFormat(undefined, { notation: "compact" });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
      <AnalyticsCard
        number={formatter.format(data.views)}
        description="Total views"
      />
      <AnalyticsCard
        number={formatter.format(data.users)}
        description="Total signups"
      />
      <AnalyticsCard
        number={`${data.uniqueCountries}`}
        description="Unique countries"
      />
    </div>
  );
};