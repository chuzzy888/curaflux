import { create } from "zustand";

type ShiftDataTypes = {
  id: string;
  NumOfShifts: number;
};

type ShiftTypes = {
  shifts: string[];
  setShifts: (shifts: string[]) => void;
  shiftsHealthcare: ShiftDataTypes | null; 
  setShiftsHealthcare: (shiftsHealthcare: ShiftDataTypes) => void;
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
}));
