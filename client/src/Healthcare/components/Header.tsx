import React, { useState } from "react";
import dp from "../../assets/images/dp.jpg";
import bg from "../../assets/images/bg.jpg";
import { FaBell } from "react-icons/fa";
import {
  IoCardOutline,
  IoHelpCircleOutline,
  IoLinkOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoNotificationsOutline,
  IoSettings,
  IoSettingsOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { Sidebar } from "primereact/sidebar";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
import { MdOutlineDateRange } from "react-icons/md";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [visibleRight, setVisibleRight] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);
  const [shiftDialog, setShiftDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [shiftData, setShiftData] = useState({
    adsNote: "",
    date: "",
    location: "",
    duration: "",
    payRate: "",
    specialization: "",
    licenseRequired: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setShiftData({ ...shiftData, [name]: value });
  };

  const handlePostShift = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // await addDoc(collection(db, "shifts"), shiftData);
      console.log("Shift posted successfully!");
      setShiftDialog(false);
      setShiftData({
        adsNote: "",
        date: "",
        location: "",
        duration: "",
        payRate: "",
        specialization: "",
        licenseRequired: "",
      });

      toast.success("Shift posted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error("Error posting shift:", error);
      toast.error("Error posting shift", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex items-center ml-64 justify-between bg-white shadow p-4">
      <h1 className="text-xl font-bold text-gray-800">Welcome!</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShiftDialog(true)}
      >
        + Post Shift
        <ToastContainer />
      </button>

      <div className="flex items-center space-x-8">
        <span className="bg-blue-50 h-10 w-10 rounded-full flex justify-center items-center relative">
          <FaBell className="text-xl" />
          <Badge
            value="2"
            className="absolute top-0 right-0 translate-x-1/2 -top-2 "
          ></Badge>
        </span>

        <div className="card">
          <span className="bg-blue-50 h-10 w-10 rounded-full flex justify-center items-center">
            <IoSettings
              className="text-xl cursor-pointer"
              onClick={() => setVisibleRight(true)}
            />
          </span>
          <Sidebar
            visible={visibleRight}
            position="right"
            onHide={() => setVisibleRight(false)}
          >
            {/* Sidebar content */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Settings</h2>
            </div>

            <div className="p-4">
              <ul className="space-y-4">
                <li className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <span className="flex items-center space-x-2">
                    <IoSettingsOutline className="text-xl" />
                    <span>Account Settings</span>
                  </span>
                  <span>&gt;</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <span className="flex items-center space-x-2">
                    <IoNotificationsOutline className="text-xl" />
                    <span>Notification Settings</span>
                  </span>
                  <span>&gt;</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <span className="flex items-center space-x-2">
                    <IoLockClosedOutline className="text-xl" />
                    <span>Security Settings</span>
                  </span>
                  <span>&gt;</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <span className="flex items-center space-x-2">
                    <IoCardOutline className="text-xl" />
                    <span>Payment Settings</span>
                  </span>
                  <span>&gt;</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <span className="flex items-center space-x-2">
                    <IoTimeOutline className="text-xl" />
                    <span>Shift Settings</span>
                  </span>
                  <span>&gt;</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <span className="flex items-center space-x-2">
                    <IoLinkOutline className="text-xl" />
                    <span>Integrations</span>
                  </span>
                  <span>&gt;</span>
                </li>
                <li className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded">
                  <span className="flex items-center space-x-2">
                    <IoHelpCircleOutline className="text-2xl" />
                    <span>Help and Support</span>
                  </span>
                  <span>&gt;</span>
                </li>
              </ul>
            </div>
          </Sidebar>
        </div>
        <img
          src={dp}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover cursor-pointer relative"
          onClick={() => setProfileDialog(true)}
        />
        <Dialog
          visible={profileDialog}
          onHide={() => setProfileDialog(false)}
          className="w-50  surface-overlay absolute top-7 right-3 tranlate-x-1/2"
          style={{ backgroundColor: "white" }}
        >
          {/* Profile dialog content */}
          <div className="card py-4  ">
            <div className="text-center mb-6">
              <div className="text-6xl text-gray-300 mb-2">
                <span
                  role="img"
                  aria-label="Hospital Icon"
                  className="flex justify-center items-center"
                >
                  <img
                    src={dp}
                    alt=""
                    className="h-20 w-20 rounded-full object-cover"
                  />
                </span>
              </div>
              <h3 className="text-xl font-bold">City General Hospital</h3>
              <p className="text-gray-500">Metropolis, NY</p>
            </div>

            <div className="flex justify-center mb-6">
              <button className="border rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                Quick Actions
              </button>
            </div>

            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Open Shifts</p>
                  <p>12</p>
                </div>
                <div>
                  <p className="font-medium">Active Locums</p>
                  <p>8</p>
                </div>
                <div>
                  <p className="font-medium">Departments</p>
                  <p>15</p>
                </div>
                <div>
                  <p className="font-medium">Feedback</p>
                  <p>24</p>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>

      <Dialog
        visible={shiftDialog}
        onHide={() => setShiftDialog(false)}
        header="Medix Care"
        className="w-1/2"
      >
        <form
          className="max-w-lg mx-auto p-6 bg-card rounded-lg shadow-md"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            objectFit: "cover",
          }}
          onSubmit={handlePostShift}
        >
          <h2 className="text-2xl font-bold text-foreground text-center">
            Post Locum Shift
          </h2>
          <p className="text-muted-foreground mb-6 text-center">
            Fill in the details for the locum shift you want to post.
          </p>
          <label className="block text-sm font-medium text-muted-foreground">
            ADS Note*
          </label>
          <textarea
            className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
            name="adsNote"
            value={shiftData.adsNote}
            onChange={handleInputChange}
            rows={3}
            placeholder="E.g., Join our General Medicine SHO Position in Lagos: Elevate Your Career, Impact Patient Care"
            required
          ></textarea>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground flex items-center gap-0.5">
                Date <MdOutlineDateRange className="text-gray-500" />
              </label>
              <input
                value={shiftData.date}
                onChange={handleInputChange}
                name="date"
                type="date"
                className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                placeholder="mm/dd/yyyy"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground flex items-center gap-0.5">
                Location
                <IoLocationOutline />
              </label>
              <input
                type="text"
                value={shiftData.location}
                onChange={handleInputChange}
                name="location"
                className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                placeholder="Location"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground flex items-center gap-0.5">
                Shift Duration <IoTimeOutline />
              </label>
              <input
                type="text"
                value={shiftData.duration}
                onChange={handleInputChange}
                name="duration"
                className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                placeholder="E.g., 8 AM - 4 PM"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Pay Rate ($/hr)
              </label>
              <input
                type="text"
                value={shiftData.payRate}
                onChange={handleInputChange}
                name="payRate"
                className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                placeholder="Enter pay rate"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Specialization
              </label>

              <select
                name="specialization"
                value={shiftData.specialization}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                required
              >
                <option value="">Select position</option>
                <option value="Registered Nurse (RN)">
                  Registered Nurse (RN)
                </option>
                <option value="Pediatric Nurse">Pediatric Nurse</option>
                <option value="Clinical Nurse Specialist">
                  Clinical Nurse Specialist
                </option>
                <option value="Public Health Nurse">Public Health Nurse</option>
                <option value="Emergency Room Nurse">
                  Emergency Room Nurse
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                License/Certification Required
              </label>
              <input
                type="text"
                value={shiftData.licenseRequired}
                onChange={handleInputChange}
                name="licenseRequired"
                className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                placeholder="Enter license or certification required"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 text-white bg-slate-700 rounded-md hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </span>
            ) : (
              "+ Schedule Shift"
            )}
          </button>
        </form>
      </Dialog>
    </header>
  );
}
