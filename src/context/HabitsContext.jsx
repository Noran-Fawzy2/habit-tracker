import { createContext, useContext, useState, useEffect } from "react";
import { getHabits, saveHabits, getProfile, saveProfile } from "../utils/storage";

const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const [habits, setHabits] = useState(getHabits);
  const [profile, setProfile] = useState(getProfile);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const addHabit = (habit) => {
    setHabits((prev) => [...prev, { ...habit, id: Date.now(), history: [] }]);
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const updateHabit = (id, updatedHabit) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      )
    );
  };

  const toggleHabit = (id) => {
    const today = new Date().toLocaleDateString("en-CA");

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        const completed = habit.history.includes(today);

        return {
          ...habit,
          history: completed
            ? habit.history.filter((date) => date !== today)
            : [...habit.history, today],
        };
      })
    );
  };

  const updateProfile = (data) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const resetData = () => {
  setHabits([]);
  setProfile({
    name: "",
    email: "",
  });
};

  return (
    <HabitsContext.Provider
      value={{
        habits,
        profile,
        addHabit,
        deleteHabit,
        updateHabit,
        toggleHabit,
        updateProfile,
        resetData,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => useContext(HabitsContext);