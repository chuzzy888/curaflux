import { useState } from "react";
import dp from "../../assets/images/dp.jpg";
import { FaBell } from "react-icons/fa";
import {
  IoCardOutline,
  IoHelpCircleOutline,
  IoLinkOutline,
  IoLockClosedOutline,
  IoNotificationsOutline,
  IoSettings,
  IoSettingsOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { Sidebar } from "primereact/sidebar";
import { Badge } from "primereact/badge";
import { Dialog } from "primereact/dialog";
import { MdLogout } from "react-icons/md";
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
  jobType: string;
  specialRequirement: string;
  skills: string[];
  shiftSupervisorName: string;
  shiftSupervisorPosition: string;
  shiftSupervisorEmail: string;
  shiftSupervisorPhoneNumber: string;
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
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([""]); // Initial skill input

  const token = Cookies.get("healthcareToken");
  const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<postShiftTypes>();

  const { shiftId } = useParams();

  const handleLogout = () => {
    Cookies.remove("healthcareToken");
    Cookies.remove("healthcareVerified");
    window.location.href = "/login/healthcare";
  };

  const handlePostShift: SubmitHandler<postShiftTypes> = async form => {
    try {
      const formData = {
        ...form,
        skills,
        hospital: decode?.hospitalName, // Assuming hospitalName is needed
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hospital/createHospital`,
        formData,
        {
          headers: { Authorization: `Bearer ${healthcareToken}` },
        }
      );

      if (data.success === true) {
        // Reset the form fields and skills state on success
        reset(); // Reset all form inputs
        setSkills([""]); // Reset skills state to initial value
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

  const handleAddSkill = () => {
    setSkills([...skills, ""]); // Add new skill input
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value; // Update specific skill input
    setSkills(newSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index); // Remove skill input
    setSkills(newSkills);
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
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
                  className="w-50 static-dialog surface-overlay absolute top-7 right-3 tranlate-x-1/2"
                  style={{ backgroundColor: "white" }}
                  draggable={false}
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
                className="w-1/2 static-dialog"
                draggable={false}
              >
                {/* Multi-step form */}
                <form onSubmit={handleSubmit(handlePostShift)} className="p-6">
                  <h2 className="text-2xl font-bold text-foreground text-center">
                    {currentStep === 1
                      ? "Post Locum Shift"
                      : "Shift Supervisor Details"}
                  </h2>

                  {currentStep === 1 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">
                          ADS Note*
                        </label>
                        <textarea
                          className="mt-1 block w-full p-3 border border-border border-blue-400 rounded-md focus:ring-2 focus:ring-ring"
                          {...register("adsNote", {
                            required: "Please add your ADS Note",
                          })}
                          rows={3}
                          placeholder="E.g., Looking for a certified doctor with experience."
                        ></textarea>
                        {errors.adsNote && (
                          <p className="text-[12px] text-red-500">
                            {errors.adsNote.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground ">
                            Date*{" "}
                          </label>
                          <input
                            type="date"
                            className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                            {...register("date", {
                              required: "Date is required.",
                            })}
                          />
                          {errors.date && (
                            <p className="text-[12px] text-red-500">
                              {errors.date.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground">
                            Location*
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                            {...register("location", {
                              required: "Location is required.",
                            })}
                            placeholder="E.g., Hospital X"
                          />
                          {errors.location && (
                            <p className="text-[12px] text-red-500">
                              {errors.location.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground">
                            Duration*
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                            {...register("duration", {
                              required: "Duration is required.",
                            })}
                            placeholder="E.g., 8 hours"
                          />
                          {errors.duration && (
                            <p className="text-[12px] text-red-500">
                              {errors.duration.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground">
                            Pay Rate*
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                            {...register("payRate", {
                              required: "Pay rate is required.",
                            })}
                            placeholder="E.g., $50/hr"
                          />
                          {errors.payRate && (
                            <p className="text-[12px] text-red-500">
                              {errors.payRate.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-muted-foreground">
                          Job Type*
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                          {...register("jobType", {
                            required: "Job type is required.",
                          })}
                          placeholder="E.g., Nurse"
                        />
                        {errors.jobType && (
                          <p className="text-[12px] text-red-500">
                            {errors.jobType.message}
                          </p>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-muted-foreground">
                          Special Requirements
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                          {...register("specialRequirement")}
                          placeholder="E.g., CPR certified"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-muted-foreground">
                          Skills
                        </label>
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="text"
                              className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                              value={skill}
                              onChange={e =>
                                handleSkillChange(index, e.target.value)
                              }
                              placeholder="E.g., Emergency Care"
                            />
                            <button
                              type="button"
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleRemoveSkill(index)}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                          onClick={handleAddSkill}
                        >
                          Add Skill
                        </button>
                      </div>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">
                          Shift Supervisor Name*
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                          {...register("shiftSupervisorName", {
                            required: "Shift supervisor name is required.",
                          })}
                        />
                        {errors.shiftSupervisorName && (
                          <p className="text-[12px] text-red-500">
                            {errors.shiftSupervisorName.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground">
                            Shift Supervisor Position*
                          </label>
                          <input
                            type="text"
                            className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                            {...register("shiftSupervisorPosition", {
                              required: "Position is required.",
                            })}
                          />
                          {errors.shiftSupervisorPosition && (
                            <p className="text-[12px] text-red-500">
                              {errors.shiftSupervisorPosition.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground">
                            Shift Supervisor Email*
                          </label>
                          <input
                            type="email"
                            className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                            {...register("shiftSupervisorEmail", {
                              required: "Email is required.",
                            })}
                          />
                          {errors.shiftSupervisorEmail && (
                            <p className="text-[12px] text-red-500">
                              {errors.shiftSupervisorEmail.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-muted-foreground">
                          Shift Supervisor Phone Number*
                        </label>
                        <input
                          type="tel"
                          className="mt-1 block w-full p-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
                          {...register("shiftSupervisorPhoneNumber", {
                            required: "Phone number is required.",
                          })}
                        />
                        {errors.shiftSupervisorPhoneNumber && (
                          <p className="text-[12px] text-red-500">
                            {errors.shiftSupervisorPhoneNumber.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex justify-between mt-6">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={handlePreviousStep}
                      >
                        Back
                      </button>
                    )}
                    {currentStep < 2 ? (
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleNextStep}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Posting..." : "Post Shift"}
                      </button>
                    )}
                  </div>
                </form>
              </Dialog>
            </header>
          </>
        );
    }
  };

  return <main className="ml-64">{renderContent()}</main>;
}
