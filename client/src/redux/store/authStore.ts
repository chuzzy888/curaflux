import { create } from "zustand";

interface AuthState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  setLoading: (loading) =>
    set((state) => ({
      ...state,
      loading,
    })),
}));

export default useAuthStore;
