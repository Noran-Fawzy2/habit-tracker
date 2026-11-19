
import {
  Droplets,
  BookOpen,
  Dumbbell,
  Brain,
  Moon,
  Heart,
  Check,
  Pencil,
  Trash2,
  Flame,
  Circle,
} from "lucide-react";

const icons = {
  water: Droplets,
  reading: BookOpen,
  fitness: Dumbbell,
  study: Brain,
  sleep: Moon,
  health: Heart,
};

function HabitCard({ habit, onToggle, onEdit, onDelete }) {
  const today = new Date().toLocaleDateString("en-CA");
  const history = habit.history || [];

  const completed = history.includes(today);
  const Icon = icons[habit.icon] || Circle;

  // Calculate current consecutive-day streak
  const getCurrentStreak = () => {
    let streak = 0;
    const date = new Date();

    if (!completed) {
      date.setDate(date.getDate() - 1);
    }

    while (true) {
      const dateKey = date.toLocaleDateString("en-CA");

      if (history.includes(dateKey)) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = getCurrentStreak();

  return (
    <div className={`habit-card ${completed ? "habit-completed" : ""}`}>
      <div className="habit-card-top">
        <div
          className="habit-icon"
          style={{
            background: habit.color || "#efedff",
            color: habit.iconColor || "#7661e8",
          }}
        >
          <Icon size={22} />
        </div>

        <div className="habit-actions">
          <button onClick={() => onEdit(habit)} title="Edit">
            <Pencil size={16} />
          </button>

          <button onClick={() => onDelete(habit.id)} title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="habit-info">
        <h3>{habit.name}</h3>
        <p>
          {habit.description || "Keep building your routine."}
        </p>
      </div>

      <div className="habit-meta">
        <span className="category-badge">
          {habit.category}
        </span>

        <span className="streak">
          <Flame size={15} />
          {streak} days
        </span>
      </div>

      <div className="habit-bottom">
        <span>{habit.target || "Daily"}</span>

        <button
          className={`complete-button ${completed ? "completed" : ""}`}
          onClick={() => onToggle(habit.id)}
        >
          {completed ? (
            <>
              <Check size={16} />
              Completed
            </>
          ) : (
            "Mark complete"
          )}
        </button>
      </div>
    </div>
  );
}

export default HabitCard;