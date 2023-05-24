import { create } from "zustand";


const store = (set) => ({
  user: {},
  setUser: (user) => set((state) => ({
    user: user
  })),
  removeUser: () => set((state) => ({
    user: {}
  })),
});

const useStore = create(store);

export default useStore;