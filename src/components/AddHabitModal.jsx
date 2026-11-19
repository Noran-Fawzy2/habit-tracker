import { useEffect, useState } from "react";
import { X, Droplets, BookOpen, Dumbbell, Brain, Moon, Heart } from "lucide-react";

const iconOptions = [
  { value: "water", icon: Droplets },
  { value: "reading", icon: BookOpen },
  { value: "fitness", icon: Dumbbell },
  { value: "study", icon: Brain },
  { value: "sleep", icon: Moon },
  { value: "health", icon: Heart },
];

const categories = [
  "Health",
  "Fitness",
  "Learning",
  "Productivity",
  "Mindfulness",
  "Personal",
];

const colors = [
  "#7661e8",
  "#42b883",
  "#ff9f43",
  "#e76f91",
  "#4e9de6",
  "#14b8a6",
];

function AddHabitModal({ open, onClose, onSave, initialHabit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Health");
  const [icon, setIcon] = useState("health");
  const [color, setColor] = useState(colors[0]);
  const [frequency, setFrequency] = useState("Daily");
  const [weeklyTarget, setWeeklyTarget] = useState(7);
  const [reminder, setReminder] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialHabit?.name || "");
      setDescription(initialHabit?.description || "");
      setCategory(initialHabit?.category || "Health");
      setIcon(initialHabit?.icon || "health");
      setColor(initialHabit?.iconColor || colors[0]);
      setFrequency(initialHabit?.frequency || "Daily");
      setWeeklyTarget(initialHabit?.weeklyTarget || 7);
      setReminder(initialHabit?.reminder || "");
      setError("");
    }
  }, [open, initialHabit]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a habit name.");
      return;
    }

    if (frequency === "Weekly" && (weeklyTarget < 1 || weeklyTarget > 7)) {
      setError("Weekly target must be between 1 and 7.");
      return;
    }

    onSave({
      name: name.trim(),
      description,
      category,
      icon,
      iconColor: color,
      color: `${color}18`,
      frequency,
      weeklyTarget: frequency === "Daily" ? 7 : Number(weeklyTarget),
      target: frequency === "Daily" ? "Every day" : `${weeklyTarget} days/week`,
      reminder,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="habit-modal">
        <div className="modal-header">
          <div>
            <h2>{initialHabit ? "Edit Habit" : "Create New Habit"}</h2>
            <p>Build a routine that helps you become your best self.</p>
          </div>

          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Habit name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Drink 2L of water"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Why is this habit important to you?"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly target</option>
              </select>
            </div>
          </div>

          {frequency === "Weekly" && (
            <div className="form-group">
              <label>Target days per week</label>
              <input
                type="number"
                min="1"
                max="7"
                value={weeklyTarget}
                onChange={(e) => setWeeklyTarget(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Choose icon</label>
            <div className="icon-selector">
              {iconOptions.map(({ value, icon: Icon }) => (
                <button
                  type="button"
                  key={value}
                  className={icon === value ? "icon-option selected" : "icon-option"}
                  onClick={() => setIcon(value)}
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Accent color</label>
            <div className="color-selector">
              {colors.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={`color-option ${color === item ? "selected" : ""}`}
                  style={{ background: item }}
                  onClick={() => setColor(item)}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Reminder (optional)</label>
            <input
              type="time"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-footer">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {initialHabit ? "Save Changes" : "Create Habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHabitModal;