import { useLocation } from "react-router-dom";
import { Search, Bell, Plus, Menu } from "lucide-react";
import { useHabits } from "../context/HabitsContext";

function Header({ onAddHabit, onMenuClick }) {
  const location = useLocation();
  const { profile } = useHabits();

  const titles = {
    "/": "Dashboard",
    "/habits": "My Habits",
    "/profile": "My Profile",
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onMenuClick}>
          <Menu size={22} />
        </button>

        <div>
          <h2>{titles[location.pathname] || "Dashboard"}</h2>
          <p>{today}</p>
        </div>
      </div>

      <div className="header-actions">
        <button className="icon-button search-button">
          <Search size={20} />
        </button>

        <button className="icon-button notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-mini">
          <div className="avatar">{profile.name?.charAt(0).toUpperCase() || ""}</div>
          <span>{profile.name}</span>
        </div>

        <button className="primary-button" onClick={onAddHabit}>
          <Plus size={18} />
          <span>Add Habit</span>
        </button>
      </div>
    </header>
  );
}

export default Header;