function StatCard({ title, value, subtitle, icon: Icon, color, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon" style={{ background: color }}>
          <Icon size={21} />
        </div>

        {trend && <span className="stat-trend">{trend}</span>}
      </div>

      <h3>{value}</h3>
      <p className="stat-title">{title}</p>
      <span className="stat-subtitle">{subtitle}</span>
    </div>
  );
}

export default StatCard;