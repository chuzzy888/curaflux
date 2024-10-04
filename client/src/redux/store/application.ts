import { create } from "zustand";

type appliedTypes = {
  hasApplied: boolean;
  setHasApplied: (hasApplied: boolean) => void;
};

export const useApplicationStore = create<appliedTypes>((set) => ({
  hasApplied: false,
  setHasApplied: (hasApplied) =>
    set((state) => ({
      ...state,
      hasApplied,
    })),
}));
