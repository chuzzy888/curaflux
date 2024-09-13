import { useState } from "react";
import { useParams } from "react-router-dom";
import { shifts } from "./shiftData"; // Import your shift data
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiCalendar, HiClock, HiUser, HiCurrencyDollar } from "react-icons/hi";
import Modal from "react-modal";
import React from "react";

const ShiftDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const shift = shifts.find(shift => shift.id === parseInt(id || ""));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [isConfirmed, setIsConfirmed] = useState(false); // State for shift confirmation

  // Modal open and close handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to handle shift acceptance
  const handleShiftAcceptance = () => {
    setIsLoading(true); // Set loading to true
    setTimeout(() => {
      setIsLoading(false); // End loading after 3 seconds
      setIsConfirmed(true); // Set confirmation state to true
    }, 3000); // Simulate 3-second loading state
  };

  if (!shift) {
    return <div className="text-center mt-10">Shift not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto bg-white border border-t-blue-500 shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">Shift Details</h1>

          {/* Shift Date and Time */}
          <div className="flex flex-wrap items-center justify-between mt-2">
            <div className="flex items-center text-gray-500">
              <HiCalendar className="mr-2" /> {shift.date}
            </div>
            <div className="flex items-center text-gray-500">
              <HiClock className="mr-2" /> {shift.duration}
            </div>
          </div>
        </div>

        {/* Hospital Info */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-bold">{shift.name}</h2>
          <div className="flex items-center text-gray-500 mb-4">
            <FaMapMarkerAlt className="mr-2" />
            {shift.location}
          </div>
          <p className="text-gray-700 mb-4">{shift.jobDescription}</p>

          {/* Skills and Expertise */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">
              Skills and Expertise:
            </h3>
            <div className="flex flex-wrap gap-2">
              {shift.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm border border-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Shift Details: Duration, Type, Payment */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <HiCurrencyDollar className="mr-2 text-gray-500 text-xl" />
              <span>{shift.payRate}</span>
            </div>
          </div>

          {/* Special Requirements */}
          {/* <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">
              Special Requirements:
            </h3>
            <p className="text-sm text-gray-600">
              For this shift, we need nurses/doctors who can verify information.
            </p>
          </div> */}

          {/* Shift Supervisor */}
          {/* <div>
            <h3 className="font-semibold text-lg mb-2">Shift Supervisor:</h3>
            <p className="text-sm text-gray-600">
              Dr. Oladipo - Head Physiotherapist
            </p>
            <p className="text-sm text-gray-600">Contact: +234 812 345 6789</p>
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex justify-between items-center">
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
            Decline Shift
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={openModal}
          >
            + Accept Shift
          </button>
        </div>

        {/* Modal for confirming shift acceptance */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="modal-content max-w-md mx-auto mt-10 p-6 bg-white flex items-center justify-center mx-8 rounded-lg shadow-xl "
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          {!isConfirmed ? (
            <div>
              <p className="font-bold">Confirm Shift</p>
              {isLoading ? (
                // Loading state
                /* From Uiverse.io by mrhyddenn */
                <div className="spinner center">
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                </div>
              ) : (
                <div>
                  <div className="text-sm text-gray-600 mb-4 ">
                    By accepting this shift, you agree to report on time and
                    fulfill the responsibilities outlined. Please ensure that
                    you are available for the entire shift duration. If
                    circumstances change, ensure to notify your supervisor as
                    soon as possible.
                  </div>
                  <div className="text-sm font-semibold mb-4">
                    Do you confirm your availability for this shift?
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={closeModal}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleShiftAcceptance}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Confirmation modal content
            <div className="modal-content max-w-md mx-auto mt-10 p-6 bg-white rounded-lg  mx-5 text-center">
              <div className="flex justify-center">
                {/* Verification Badge */}
                <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">✓</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-4">Shift Confirmed</h2>
              <p className="text-sm text-gray-600 mb-4">
                Thank you! You have successfully accepted the shift. Check your
                inbox for further details. The hospital will reach out soon.
              </p>
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ShiftDetails;
