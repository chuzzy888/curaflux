import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowCircleLeft, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import React from "react";
import lg from "../../assets/images/hlg.png";
import clk from "../../assets/images/clk.png";
import jbt from "../../assets/images/jbt.png";
import vct from "../../assets/images/vct.png";
import cld from "../../assets/images/Calendar.png";
import mapimg from "../../assets/images/Frame.png";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Button } from "../../components/ui/button";
import { useShiftStore } from "../../redux/store/shiftStore";
import { formatDate } from "../../lib/DateFormatter";
import { format } from "timeago.js";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const ShiftDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const token = Cookies.get("locumToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [appliedShifts, setAppliedShifts] = useState<Record<string, boolean>>(
    {}
  );

  const { shiftDetails: shift, setShiftDetails } = useShiftStore();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;

  // console.log(shift?._id);
  console.log(shift?.location);

  useEffect(() => {
    const fetchShiftDetails = async () => {
      /// this is for getting the shift details
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_BASE_URL}/hospital/getHospitalById/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setShiftDetails(data.singleHospital); // the code is working fine now

        // Create a map of applied shifts
        const appliedShiftsMap = data.appliedShift.reduce(
          (
            acc: { [x: string]: boolean },
            application: { hospitalId: string | number }
          ) => {
            acc[application.hospitalId] = true;
            return acc;
          },
          {}
        );
        setAppliedShifts(appliedShiftsMap);

        // console.log(data); // make use of axios
      } catch (error) {
        console.log(error);
      }
    };

    fetchShiftDetails();
  }, [id]);

  const applyForShift = async (hospitalId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/shift/application`,
        { hospitalId: id, userId: decode?.userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log(data);
      // Update the appliedShifts state
      setAppliedShifts(prev => ({ ...prev, [hospitalId]: true }));
    } catch (error) {
      console.error("Failed to apply for shift:", error);
      ("Failed to apply for shift. Please try again later.");
    }
  };

  return (
    <ScreenLayout>
      <main className=" bg-white  overflow-hidden pb-10">
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="md:text-2xl md:font-bold flex items-center gap-2">
              <FaArrowCircleLeft />
              Shift Details
            </h1>
            <div className="text-sm text-gray-500 ">
              {shift?.createdAt
                ? format(shift.createdAt)
                : "Date not available"}
            </div>
          </div>
          <div className="border-b-2 border-gray-300"></div>
          {/* Title and Location */}
          <div className="text-xl font-semibold text-gray-800 flex items-center">
            <img
              src={lg}
              alt="Hospital"
              className="h-12 w-12 rounded-full mr-4"
            />
            {shift?.hospital.hospitalName}
          </div>
          <div className="flex items-center text-gray-500 mb-4 text-sm md:text-[16px]">
            <FaMapMarkerAlt className="mr-2 text-blue-600 h-5" />
            {shift?.location}
          </div>
          {/* Date and Time */}
          <div className="flex flex-wrap items-center justify-between mt-2 mb-4">
            <div className="flex items-center gap-2 text-gray-500">
              <img src={cld} alt="" className="h-5" /> {formatDate(shift?.date)}
            </div>
            <div className="flex items-center  bg-[#D9F1FD] px-5 p-1 rounded-lg">
              {shift?.duration}
            </div>
          </div>
          {/* Hospital Info */}
          <div className="flex items-start mb-6">
            <p className="text-sm text-gray-700 mt-2">{shift?.adsNote}</p>
          </div>
          {/* Skills and Expertise */}

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2 ">Skills and Expertise -</h3>
            <div className="flex flex-wrap gap-2">
              {shift?.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-2  bg-[#D9F1FD] rounded-lg text-sm "
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="border-b-2 border-gray-300"></div>

          {/* Shift Details (Duration, Job Type, Payment) */}

          <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col md:flex-row items-center text-gray-600">
              <img src={clk} alt="" className="h-8 mr-2" />
              <div className="flex flex-col">
                <p className="text-sm sm:text-base">Duration</p>
                <span className="text-sm sm:text-base">{shift?.duration}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row  items-center text-gray-600">
              <img src={jbt} alt="" className="h-7 mr-2" />
              <div className="flex flex-col">
                <p className="text-sm sm:text-base">Job Type</p>
                <span className="text-sm sm:text-base">{shift?.jobType}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row  items-center text-gray-600">
              <img src={vct} alt="" className="h-7 mr-2" />
              <div className="flex flex-col">
                <p className="text-sm sm:text-base">Payment</p>
                <span className="text-sm sm:text-base">{shift?.payRate}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 bg-white p-6 shadow-md rounded-lg">
            {/* Map Image */}
            <img
              src={mapimg}
              alt="Map"
              className="w-full h-64 object-cover rounded-lg"
            />

            {/* Address Text */}
            <p className="text-gray-700 text-center text-lg">
              {shift?.location}
            </p>

            {/* Get Directions Button */}
            {shift?.location ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  shift.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-[#009FF5] text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                  Get Directions
                </button>
              </a>
            ) : (
              <span>No address available</span>
            )}
          </div>

          {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <img src={clk} alt="" className="h-8 mr-2" />
              <div className="flex flex-col">
                <p className="text-sm sm:text-base">Duration</p>
                <span className="text-sm sm:text-base">8 Hours</span>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <img src={jbt} alt="" className="h-7 mr-2" />
              <div className="flex flex-col">
                <p className="text-sm sm:text-base">Job Type</p>
                <span className="text-sm sm:text-base">One Time</span>
              </div>
            </div>

            <div className="flex items-center justify-center text-gray-600 col-span-2 sm:col-span-1 md:col-span-1">
              <img src={vct} alt="" className="h-7 mr-2" />
              <div className="flex flex-col">
                <p className="text-sm sm:text-base">Payment</p>
                <span className="text-sm sm:text-base">{shift?.payRate}</span>
              </div>
            </div>
          </div> */}

          <div className="border-b-2 border-gray-300"></div>

          {/* Special Requirements */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Special Requirements</h3>
            <p className="text-sm text-gray-700">{shift?.specialRequirement}</p>
          </div>
          {/* Shift Supervisor */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Shift Supervisor</h3>
            <p className="text-sm text-gray-700">
              {shift?.shiftSupervisorName}
            </p>
            <p className="text-sm text-gray-700">
              {shift?.shiftSupervisorEmail}
            </p>
            <p className="text-sm text-gray-700">
              Phone: {shift?.shiftSupervisorPhoneNumber}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {shift && !appliedShifts[shift._id] ? (
          <div className="p-6 flex justify-center gap-5 items-center">
            <Link to={"/shift"}>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                Decline Shift
              </button>
            </Link>
            <button
              className="bg-[#009FF5] text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={openModal}
            >
              Accept Shift
            </button>
          </div>
        ) : (
          <div className=" text-center">
            <Button
              className={`text-white px-4 py-2 rounded-full ${
                shift && appliedShifts[shift._id] && "cursor-not-allowed"
              } ${
                shift && appliedShifts[shift._id]
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              size="sm"
              onClick={() => shift && applyForShift(shift._id)}
              disabled={shift && appliedShifts[shift._id] ? true : false}
            >
              {shift && appliedShifts[shift._id] ? "Applied" : "Apply Now"}
            </Button>
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {}}
          className="modal-content max-w-md mx-auto p-6 bg-white flex items-center justify-center rounded-lg shadow-xl"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4"
        >
          {!isConfirmed ? (
            <div>
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="loading">
                    <div className="d1"></div>
                    <div className="d2"></div>
                  </div>
                </div>
              ) : (
                <div className="relative p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
                  {/* Close Button */}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes />
                  </button>

                  {/* Modal Title */}
                  <p className="text-center font-bold text-lg mb-4">
                    Confirm Shift
                  </p>

                  {/* Shift Details */}
                  <div className="flex justify-center flex-col items-center mb-4">
                    <img src={lg} alt="Logo" className="h-12 mb-4" />
                    <p className="text-blue-300 text-sm">
                      {shift?.hospital.hospitalName}
                    </p>
                  </div>

                  {/* Shift Description */}
                  <div className="text-center text-sm text-gray-600 mb-4">
                    By accepting this shift , you agree to report on time and
                    fulfill the responsibilities outlined.
                  </div>

                  {/* Confirm Availability Text */}
                  <div className="text-center text-sm font-semibold mb-6">
                    Do you confirm your availability for this shift?
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-center gap-4">
                    {/* Cancel Button (Styled as Text) */}
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>

                    {/* Confirm Button (Solid Black) */}
                    <button
                      // onClick={handleShiftAcceptance}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                      onClick={() => shift && applyForShift(shift?._id)}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="modal-content max-w-md mx-auto p-6 bg-white rounded-lg text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">✓</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-4">Shift Confirmed</h2>
              <p className="text-sm text-gray-600 mb-4">
                Thank you! You have successfully accepted the shift. Check your
                inbox for further details.
              </p>
              <Link to={"/shift"}>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Close
                </button>
              </Link>
            </div>
          )}
        </Modal>
      </main>
    </ScreenLayout>
  );
};

export default ShiftDetails;
