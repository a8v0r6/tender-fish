const StatCard = ({ value, label }) => (
  <div className="text-center group">
    <div className="text-4xl font-headline font-black text-primary mb-2 group-hover:scale-105 transition-transform">
      {value}
    </div>
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/60">{label}</div>
  </div>
);

export default StatCard;
