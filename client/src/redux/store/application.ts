import { create } from "zustand";

type applicantTypes = {
  userId: {
    photo: string;
    fullName: string;
    specialty: string;
    status: string;
    experience: string;
  };
}[];

type appliedTypes = {
  hasApplied: boolean;
  setHasApplied: (hasApplied: boolean) => void;

  applicants: applicantTypes;
  setApplicants: (applicants: applicantTypes) => void;
};

export const useApplicationStore = create<appliedTypes>((set) => ({
  hasApplied: false,
  setHasApplied: (hasApplied) =>
    set((state) => ({
      ...state,
      hasApplied,
    })),

  applicants: [],
  setApplicants: (applicants) =>
    set((state) => ({
      ...state,
      applicants,
    })),
}));
