import { useState } from "react";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { useHabits } from "../context/HabitsContext";
import HabitCard from "../components/HabitCard";

function MyHabits({ onAddHabit, onEditHabit }) {
  const { habits, toggleHabit, deleteHabit } = useHabits();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const today = new Date().toLocaleDateString("en-CA");

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || habit.category === category;

    const completed = habit.history?.includes(today);

    const matchesStatus =
      status === "All" ||
      (status === "Completed" && completed) ||
      (status === "Pending" && !completed);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="habits-page">
      <div className="page-intro">
        <div>
          <h1>My Habits</h1>
          <p>Manage your routines and build better habits every day.</p>
        </div>

        <button className="primary-button" onClick={onAddHabit}>
          <Plus size={18} />
          Add New Habit
        </button>
      </div>

      <div className="habits-toolbar">
        <div className="search-input">
          <Search size={18} />
          <input
            placeholder="Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-control">
          <SlidersHorizontal size={17} />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Learning">Learning</option>
            <option value="Productivity">Productivity</option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <select
          className="status-filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed Today</option>
          <option value="Pending">Pending Today</option>
        </select>
      </div>

      <div className="habits-count">
        <span>{filteredHabits.length} habits</span>
      </div>

      {filteredHabits.length === 0 ? (
        <div className="empty-state">
          <Search size={38} />
          <h3>No habits found</h3>
          <p>Try changing your filters or create a new habit.</p>
          <button className="primary-button" onClick={onAddHabit}>
            <Plus size={18} />
            Create Habit
          </button>
        </div>
      ) : (
        <div className="habits-grid all-habits-grid">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onEdit={onEditHabit}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyHabits;