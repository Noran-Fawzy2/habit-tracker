import { useState } from "react";
import {
  UserRound,
  Mail,
  CalendarDays,
  Target,
  CheckCircle2,
  Pencil,
  Save,
  Flame,
  Trash2,
} from "lucide-react";
import { useHabits } from "../context/HabitsContext";

function Profile() {
  const { profile, habits, updateProfile, resetData } = useHabits();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const totalCompletions = habits.reduce(
    (total, habit) => total + (habit.history?.length || 0),
    0
  );

  const today = new Date().toLocaleDateString("en-CA");

  const completedToday = habits.filter((habit) =>
    habit.history?.includes(today)
  ).length;

  const completionRate = habits.length
    ? Math.round((completedToday / habits.length) * 100)
    : 0;

  const saveChanges = () => {
    if (!name.trim()) return;

    updateProfile({ name: name.trim(), email });
    setEditing(false);
  };

  const handleReset = () => {
    resetData();
    setName("");
    setEmail("");
    setShowConfirmation(false);
  };

  return (
    <div className="profile-page">
      <div className="page-intro">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information and track your achievements.</p>
        </div>
      </div>

      <div className="profile-layout">
        <section className="profile-main-card">
          <div className="profile-banner"></div>

          <div className="profile-user">
            <div className="profile-avatar">
              {profile.name?.charAt(0).toUpperCase() || ""}
            </div>

            <div className="profile-user-info">
              <h2>{profile.name}</h2>
              <p>HabitFlow Member</p>
            </div>

            <button
              className="secondary-button profile-edit-button"
              onClick={() => setEditing(!editing)}
            >
              <Pencil size={16} />
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {editing ? (
            <div className="profile-form">
              <div className="form-group">
                <label>Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className="primary-button" onClick={saveChanges}>
                <Save size={17} />
                Save Changes
              </button>
            </div>
          ) : (
            <div className="profile-details">
              <div className="profile-detail">
                <UserRound size={19} />
                <div>
                  <span>Full Name</span>
                  <strong>{profile.name}</strong>
                </div>
              </div>

              <div className="profile-detail">
                <Mail size={19} />
                <div>
                  <span>Email Address</span>
                  <strong>{profile.email}</strong>
                </div>
              </div>

              <div className="profile-detail">
                <CalendarDays size={19} />
                <div>
                  <span>Member Since</span>
                  <strong>November 2026</strong>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="profile-stats">
          <h2>Your Achievements</h2>

          <div className="profile-stat">
            <div className="profile-stat-icon purple">
              <Target size={21} />
            </div>
            <div>
              <span>Total Habits</span>
              <strong>{habits.length}</strong>
            </div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-icon green">
              <CheckCircle2 size={21} />
            </div>
            <div>
              <span>Total Completions</span>
              <strong>{totalCompletions}</strong>
            </div>
          </div>

          <div className="profile-stat">
            <div className="profile-stat-icon orange">
              <Flame size={21} />
            </div>
            <div>
              <span>Today's Completion</span>
              <strong>{completionRate}%</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="settings-card">
        <h2>Settings</h2>
        <p>Manage your HabitFlow data.</p>

        <button className="danger-button" onClick={() => setShowConfirmation(true)}>
          <Trash2 size={17} />
          Reset All Data
        </button>
      </section>

      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h2>Reset all data?</h2>
            <p>This will permanently delete all your habits and progress.</p>

            <div className="modal-footer">
              <button
                className="secondary-button"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>

              <button className="danger-button" onClick={handleReset}>
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;