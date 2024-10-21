import { create } from "zustand";

interface UserInfo {
  firstName: string;
  nickName: string;
  fullName: string;
  profilePic: string;
  email: string;
  phoneNumber: string;
  nmcnNumber: string;
  mdcnNumber: string;
  identificationNumber: string;
  address: string;
  photo: string;
  specialty: string;
  experience: string;
  linkedInUrl: string;
  bio: string;
  _id: string;
  availability: string;
  timeOfWork: string;
  lastShift: string;
  availableTime: string;
  availableWork: string;
  certifications: string[];
}

interface AuthState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  loading: false,

  setLoading: (loading) =>
    set((state) => ({
      ...state,
      loading,
    })),

  userInfo: {
    firstName: "",
    nickName: "",
    fullName: "",
    profilePic: "",
    email: "",
    phoneNumber: "",
    nmcnNumber: "",
    mdcnNumber: "",
    identificationNumber: "",
    address: "",
    photo: "",
    specialty: "",
    experience: "",
    linkedInUrl: "",
    bio: "",
    _id: "",
    availability: "",
    timeOfWork: "",
    lastShift: "",
    availableTime: "",
    availableWork: "",
    certifications: [],
  },

  setUserInfo: (userInfo) =>
    set((state) => ({
      ...state,
      userInfo,
    })),
}));

export default useAuthStore;
