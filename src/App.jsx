import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AddHabitModal from "./components/AddHabitModal";

import Dashboard from "./pages/Dashboard";
import MyHabits from "./pages/MyHabits";
import Profile from "./pages/Profile";

import { useHabits } from "./context/HabitsContext";

function App() {
  const { addHabit, updateHabit } = useHabits();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const openAddModal = () => {
    setEditingHabit(null);
    setModalOpen(true);
  };

  const openEditModal = (habit) => {
    setEditingHabit(habit);
    setModalOpen(true);
  };

  const handleSave = (habitData) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, habitData);
    } else {
      addHabit(habitData);
    }

    setEditingHabit(null);
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingHabit(null);
  };

  return (
    <div className="app-layout">
      <Sidebar mobileMenu={mobileMenu} />

      {mobileMenu && (
        <div className="mobile-overlay" onClick={() => setMobileMenu(false)} />
      )}

      <div className={`main-layout ${mobileMenu ? "menu-open" : ""}`}>
        <Header
          onAddHabit={openAddModal}
          onMenuClick={() => setMobileMenu(!mobileMenu)}
        />

        <main className="page-content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard onEditHabit={openEditModal} />}
            />

            <Route
              path="/habits"
              element={
                <MyHabits
                  onAddHabit={openAddModal}
                  onEditHabit={openEditModal}
                />
              }
            />

            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>

      <AddHabitModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialHabit={editingHabit}
      />
    </div>
  );
}

export default App;