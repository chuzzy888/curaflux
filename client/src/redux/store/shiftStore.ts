import { create } from "zustand";

type ShiftDataTypes = {
  id: string;
  NumOfShifts: number;
  yourShift: {
    _id: string;
    date: string;
    duration: string;
    specialization: string;
    payRate: string;
    location: string;
    status: string;
  }[];
};

type shiftDetailsType = {
  _id: string;
  adsNote: string;
  date: string;
  duration: string;
  hospital: {
    hospitalName: string;
    address: string;
    email: string;
    hospitalType: string;
    phoneNumber: string;
    _id: string;
  };
  location: string;
  payRate: string;
  specialization: string;
  jobType: string;
  specialRequirement: string;
  skills: string[];
  status: string; // Added missing status property
};

type ShiftTypes = {
  shifts: string[];
  setShifts: (shifts: string[]) => void;
  shiftsHealthcare: ShiftDataTypes | null;
  setShiftsHealthcare: (shiftsHealthcare: ShiftDataTypes) => void;

  shiftDetails: shiftDetailsType | null;
  setShiftDetails: (shiftDetails: shiftDetailsType) => void;
};

export const useShiftStore = create<ShiftTypes>((set) => ({
  shifts: [],
  setShifts: (shifts) =>
    set((state) => ({
      ...state,
      shifts,
    })),

  shiftsHealthcare: null,
  setShiftsHealthcare: (shiftsHealthcare) =>
    set((state) => ({
      ...state,
      shiftsHealthcare,
    })),

  shiftDetails: null,
  setShiftDetails: (shiftDetails) =>
    set((state) => ({
      ...state,
      shiftDetails,
    })),
}));
