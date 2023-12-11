import { create } from "zustand";

export const useUser = create((set) => ({
  user: undefined,
  updated: true,
  tasks: [],
  favorite: [],
  setUser: (user) => set(() => ({ user })),
  setUpdated: (check) => set(() => ({ updated: check })),
  setTasks: (tasks) => set(() => ({ tasks })),
  setFavorite: (favorite) => set(() => ({favorite: favorite})),
  setTasks: (tasks) => set(() => ({tasks: tasks}))
}));
