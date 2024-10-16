import { create } from "zustand";

type applicantTypes = {
  status: string;
  userId: {
    photo: string;
    fullName: string;
    specialty: string;
    status: string;
    experience: string;
    email: string;
    phoneNumber: string;
    mdcnNumber: string;
    nmcnNumber: string;
    _id: string;
  };

  shiftId: {
    jobType: string;
    adsNote: string;
    duration: string;
    payRate: string;

    _id: string;
  };
  _id: string;
}[];

type appliedTypes = {
  hasApplied: boolean;
  setHasApplied: (hasApplied: boolean) => void;

  applicants: applicantTypes;
  setApplicants: (applicants: applicantTypes) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;
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

  loading: false,
  setLoading: (loading) =>
    set((state) => ({
      ...state,
      loading,
    })),
}));
