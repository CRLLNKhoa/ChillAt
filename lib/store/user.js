import { create } from "zustand";

export const useUser = create((set) => ({
  user: undefined,
  updated: true,
  setUser: (user) => set(() => ({ user })),
  setUpdated: (check) => set(() => ({ updated: check }))
}));
