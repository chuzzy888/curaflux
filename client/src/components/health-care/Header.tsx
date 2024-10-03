import { useState } from "react";
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
import { MdLogout, MdOutlineDateRange } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Modal } from "../modals/Success-Modal";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "../ui/button";

type postShiftTypes = {
  adsNote: string;
  date: string;
  location: string;
  duration: string;
  payRate: string;
  specialization: string;
  licenseRequired: string;
};

interface CustomJwtPayload extends JwtPayload {
  hospitalName: string;
  address: string;
}

export default function Header() {
  const [visibleRight, setVisibleRight] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);
  const [shiftDialog, setShiftDialog] = useState(false);
  const healthcareToken = Cookies.get("healthcareToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const token = Cookies.get("healthcareToken");
  const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm<postShiftTypes>();

  const { shiftId } = useParams();

  console.log(decode);

  const handleLogout = () => {
    Cookies.remove("healthcareToken");
    Cookies.remove("healthcareVerified");

    window.location.href = "/login/healthcare";
  };

  const handlePostShift: SubmitHandler<postShiftTypes> = async (form) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hospital/createHospital`,
        form,
        {
          headers: { Authorization: `Bearer ${healthcareToken}` },
        }
      );

      if (data.success === true) {
        setShiftDialog(false);

        setTimeout(() => {
          setModalMessage("Your shift has been posted successfully");
          setIsModalOpen(true);
        }, 2000);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      setModalMessage(
        axiosError?.response?.data?.message || "Failed to create shift"
      );
      setIsModalOpen(true);
    }
  };

  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case `/curaflux/${decode?.hospitalName}/admin/all-shift`:
        return (
          <main className="bg-white shadow p-4">
            <p className="font-bold text-gray-800 text-xl">All Shift</p>
          </main>
        );
      case `/curaflux/healthcare/admin/shift-details/${shiftId}`:
        return (
          <main className="bg-white shadow p-4">
            <p className="font-bold text-gray-800 text-xl">Shift Details</p>
          </main>
        );

      default:
        return (
          <>
            <header className="flex items-center  justify-between bg-white shadow p-4">
              <Modal
                msg={modalMessage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
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
                  <div className="card">
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
                      <h3 className="text-xl font-bold">
                        {decode?.hospitalName}
                      </h3>
                      <p className="text-gray-500">
                        {decode?.address || "soon"}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <Button
                        className="flex items-center py-2 px-4 text-gray-700 bottom-0 bg-transparent border hover:text-white"
                        onClick={handleLogout}
                      >
                        <p className="mr-3">
                          <MdLogout />
                        </p>
                        Logout
                      </Button>
                    </div>

                    {/* <div className="flex justify-center mb-6">
                      <button className="border rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                        Quick Actions
                      </button>
                    </div> */}
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
                  onSubmit={handleSubmit(handlePostShift)}
                >
                  <h2 className="text-2xl font-bold text-foreground text-center">
                    Post Locum Shift
                  </h2>
                  <p className="text-muted-foreground mb-6 text-center">
                    Fill in the details for the locum shift you want to post.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground">
                      ADS Note*
                    </label>
                    <textarea
                      className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                      {...register("adsNote", {
                        required: "Please add your adsNote",
                      })}
                      rows={3}
                      placeholder="E.g., Join our General Medicine SHO Position in Lagos: Elevate Your Career, Impact Patient Care"
                    ></textarea>

                    {errors.adsNote && (
                      <p className=" text-[12px] text-red-500">
                        {errors.adsNote.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground flex items-center gap-0.5">
                        Date <MdOutlineDateRange className="text-gray-500" />
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                        placeholder="mm/dd/yyyy"
                        {...register("date", {
                          required: "Please add your date",
                        })}
                      />

                      {errors.date && (
                        <p className=" text-[12px] text-red-500">
                          {errors.date.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground flex items-center gap-0.5">
                        Location
                        <IoLocationOutline />
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                        placeholder="Location"
                        {...register("location", {
                          required: "Please add your location",
                        })}
                      />

                      {errors.location && (
                        <p className=" text-[12px] text-red-500">
                          {errors.location.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground flex items-center gap-0.5">
                        Shift Duration <IoTimeOutline />
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                        placeholder="E.g., 8 AM - 4 PM"
                        {...register("duration", {
                          required: "Please add your duration",
                        })}
                      />

                      {errors.duration && (
                        <p className=" text-[12px] text-red-500">
                          {errors.duration.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground">
                        Pay Rate ($/hr)
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                        placeholder="Enter pay rate"
                        {...register("payRate", {
                          required: "Please add your payRate",
                        })}
                      />

                      {errors.payRate && (
                        <p className=" text-[12px] text-red-500">
                          {errors.payRate.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground">
                        Specialization
                      </label>

                      <select
                        className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                        {...register("specialization", {
                          required: "Please add your specialization",
                        })}
                      >
                        <option value="">Select position</option>
                        <option value="Registered Nurse (RN)">
                          Registered Nurse (RN)
                        </option>
                        <option value="Pediatric Nurse">Pediatric Nurse</option>
                        <option value="Clinical Nurse Specialist">
                          Clinical Nurse Specialist
                        </option>
                        <option value="Public Health Nurse">
                          Public Health Nurse
                        </option>
                        <option value="Emergency Room Nurse">
                          Emergency Room Nurse
                        </option>
                      </select>

                      {errors.specialization && (
                        <p className=" text-[12px] text-red-500">
                          {errors.specialization.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground">
                        License/Certification Required
                      </label>
                      <input
                        type="text"
                        className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                        placeholder="Enter license or certification required"
                        {...register("licenseRequired", {
                          required: "Please add your license Requirement",
                        })}
                      />

                      {errors.licenseRequired && (
                        <p className=" text-[12px] text-red-500">
                          {errors.licenseRequired.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-6 text-white bg-slate-700 rounded-md hover:bg-primary/90"
                    disabled={!isValid}
                  >
                    {isSubmitting ? (
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
          </>
        );
    }
  };

  return <main className="ml-64">{renderContent()}</main>;
}
