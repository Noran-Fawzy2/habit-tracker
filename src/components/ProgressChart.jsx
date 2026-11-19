import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ProgressChart({ habits }) {
  const data = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const dateKey = date.toLocaleDateString("en-CA");

    const completed = habits.filter((habit) =>
      habit.history?.includes(dateKey)
    ).length;

    data.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      completed,
      total: habits.length,
      percentage: habits.length
        ? Math.round((completed / habits.length) * 100)
        : 0,
    });
  }

  return (
    <div className="chart-container">
      <div className="chart-heading">
        <div>
          <h3>Weekly Activity</h3>
          <p>Your habit completion over the last 7 days</p>
        </div>

        <span className="chart-badge">This week</span>
      </div>

      <div className="chart">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eeeeF5" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#858399", fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#858399", fontSize: 12 }}
            />

            <Tooltip
              cursor={{ fill: "#f3f1ff" }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #ecebf2",
              }}
              formatter={(value) => [`${value} habits`, "Completed"]}
            />

            <Bar
              dataKey="completed"
              fill="#7661e8"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;