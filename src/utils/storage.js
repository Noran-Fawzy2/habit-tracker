
const HABITS_KEY = "habitflow_habits";
const PROFILE_KEY = "habitflow_profile";

const demoHabits = [
  {
    id: 1,
    name: "Drink 2L of water",
    description: "Stay hydrated throughout the day",
    category: "Health",
    icon: "water",
    iconColor: "#4e9de6",
    color: "#e8f3ff",
    frequency: "Daily",
    weeklyTarget: 7,
    target: "2 liters",
    history: [],
  },
  {
    id: 2,
    name: "Read for 30 minutes",
    description: "Read something meaningful every day",
    category: "Learning",
    icon: "reading",
    iconColor: "#7661e8",
    color: "#efedff",
    frequency: "Daily",
    weeklyTarget: 7,
    target: "30 minutes",
    history: [],
  },
  {
    id: 3,
    name: "Exercise",
    description: "Move your body and stay active",
    category: "Fitness",
    icon: "fitness",
    iconColor: "#42b883",
    color: "#e5f8ef",
    frequency: "Daily",
    weeklyTarget: 7,
    target: "30 minutes",
    history: [],
  },
  {
    id: 4,
    name: "Study for 2 hours",
    description: "Focus on your learning goals",
    category: "Productivity",
    icon: "study",
    iconColor: "#ff9f43",
    color: "#fff0e3",
    frequency: "Daily",
    weeklyTarget: 7,
    target: "2 hours",
    history: [],
  },
];

export const getHabits = () => {
  try {
    const data = localStorage.getItem(HABITS_KEY);

    if (data === null) {
      return demoHabits;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Failed to load habits:", error);
    return demoHabits;
  }
};

export const saveHabits = (habits) => {
  try {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error("Failed to save habits:", error);
  }
};

export const getProfile = () => {
  try {
    const savedProfile = localStorage.getItem(PROFILE_KEY);

    return savedProfile
      ? JSON.parse(savedProfile)
      : { name: "", email: "" };
  } catch (error) {
    console.error("Failed to load profile:", error);
    return { name: "", email: "" };
  }
};

export const saveProfile = (profile) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save profile:", error);
  }
};

export const clearStorage = () => {
  localStorage.removeItem(HABITS_KEY);
  localStorage.removeItem(PROFILE_KEY);
};