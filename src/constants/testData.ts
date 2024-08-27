const testSuccessCreateHabit = {
  name: "sucessfull habit creation",
  description: "30 minutes of cardio or strength training",
  target_days_per_week: 1,
};

const testSuccessUpdateHabit = {
  validDate: {
    date: "2024-08-21",
  },
  invalidDate: {
    date: "2024-8-21",
  },
  conflictDate: {
    date: "2024-08-21",
  },
};

export { testSuccessCreateHabit, testSuccessUpdateHabit };
