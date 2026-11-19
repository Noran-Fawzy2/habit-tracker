import { useMemo } from "react";
import {
  Target,
  CheckCircle2,
  Flame,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useHabits } from "../context/HabitsContext";
import StatCard from "../components/StatCard";
import HabitCard from "../components/HabitCard";
import ProgressChart from "../components/ProgressChart";

function Dashboard({ onEditHabit }) {
 const { habits, profile, toggleHabit, deleteHabit } = useHabits();
  const today = new Date().toLocaleDateString("en-CA");

  const completedToday = habits.filter((habit) =>
    habit.history?.includes(today)
  ).length;

  const completionRate = habits.length
    ? Math.round((completedToday / habits.length) * 100)
    : 0;

  const totalCompletions = habits.reduce(
    (total, habit) => total + (habit.history?.length || 0),
    0
  );

  const getStreak = (habit) => {
    let streak = 0;
    const date = new Date();

    if (!habit.history?.length) return 0;

    const completedToday = habit.history.includes(today);

    if (!completedToday) {
      date.setDate(date.getDate() - 1);
    }

    while (true) {
      const dateKey = date.toLocaleDateString("en-CA");

      if (habit.history.includes(dateKey)) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = useMemo(() => {
    return habits.reduce((max, habit) => Math.max(max, getStreak(habit)), 0);
  }, [habits]);

 const firstName = profile.name || "there";
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="dashboard-page">
      <section className="welcome-section">
        <div>
          <span className="welcome-tag">
            <Sparkles size={15} />
            YOUR PERSONAL SPACE
          </span>

          <h1>Good day, {firstName}</h1>

          <p>Small steps every day lead to big changes. Keep going</p>
        </div>

        <div className="welcome-date">
          <span>Today</span>
          <strong>{todayFormatted}</strong>
        </div>
      </section>

      <section className="stats-grid">
        <StatCard
          title="Total Habits"
          value={habits.length}
          subtitle="Habits you're tracking"
          icon={Target}
          color="#efedff"
        />

        <StatCard
          title="Completed Today"
          value={`${completedToday}/${habits.length}`}
          subtitle="Habits completed today"
          icon={CheckCircle2}
          color="#e5f8ef"
        />

        <StatCard
          title="Current Streak"
          value={`${currentStreak} days`}
          subtitle="Your best active streak"
          icon={Flame}
          color="#fff0e3"
        />

        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          subtitle="Today's progress"
          icon={TrendingUp}
          color="#e8f3ff"
        />
      </section>

      <section className="dashboard-progress-card">
        <div className="progress-info">
          <div>
            <h3>Today's Progress</h3>
            <p>You're doing great. Keep it up</p>
          </div>

          <strong>{completionRate}%</strong>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completionRate}%` }} />
        </div>

        <div className="progress-caption">
          <span>{completedToday} completed</span>
          <span>{habits.length - completedToday} remaining</span>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="today-section">
          <div className="section-heading">
            <div>
              <h2>Today's Habits</h2>
              <p>Stay consistent with your daily routine</p>
            </div>

            <Link to="/habits" className="text-link">
              View all <ArrowRight size={16} />
            </Link>
          </div>

          {habits.length === 0 ? (
            <div className="empty-state">
              <Target size={40} />
              <h3>No habits yet</h3>
              <p>Start building your routine by creating your first habit.</p>
            </div>
          ) : (
            <div className="habits-grid">
              {habits.slice(0, 4).map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={{ ...habit, streak: getStreak(habit) }}
                  onToggle={toggleHabit}
                  onEdit={onEditHabit}
                  onDelete={deleteHabit}
                />
              ))}
            </div>
          )}
        </section>

        <section className="weekly-section">
          <ProgressChart habits={habits} />

          <div className="total-completions-card">
            <div className="total-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <h3>{totalCompletions}</h3>
              <p>Total habit completions</p>
            </div>
          </div>
        </section>
      </div>

      <section className="quote-card">
        <Sparkles size={22} />
        <div>
          <h3>"Success is the sum of small efforts, repeated day in and day out."</h3>
       </div>
      </section>
    </div>
  );
}

export default Dashboard;