import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  UserRound,
  Sparkles,
  Target,
} from "lucide-react";

function Sidebar({ mobileMenu }) {
  return (
    <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-icon">
          <Target size={24} />
        </div>
        <span>HabitFlow</span>
      </div>

      <p className="sidebar-label">MENU</p>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/habits" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <CheckSquare size={20} />
          My Habits
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <UserRound size={20} />
          Profile
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <div className="motivation-card">
          <Sparkles size={20} />
          <h4>Stay consistent</h4>
          <p>Small steps every day lead to big changes.</p>
        </div>

        <div className="sidebar-footer">
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;