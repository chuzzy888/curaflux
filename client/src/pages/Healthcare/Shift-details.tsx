import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useShiftStore } from "../../redux/store/shiftStore";
import {
  IoCalendarClearOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { FaRegClock, FaRegHospital } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { formatDate } from "../../lib/DateFormatter";
import { ShiftDetailsSkeleton } from "../../components/skeleton/shifts";

const HealthCareShiftDetails = () => {
  const { shiftId } = useParams();

  const healthcareToken = Cookies.get("healthcareToken");

  const { shiftDetails, setShiftDetails, loading, setLoading } =
    useShiftStore();

  const getShiftDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/hospital/getHospitalById/${shiftId}`,
        {
          headers: { Authorization: `Bearer ${healthcareToken}` },
        }
      );

      setShiftDetails(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getShiftDetails();
  }, [shiftId]);

  return (
    <main className=" p-8 ml-64 grid grid-cols-2 gap-6">
      {loading ? (
        <ShiftDetailsSkeleton num={1} className="w-full h-[400px]" />
      ) : (
        <section className="border shadow rounded-md p-4">
          <h2 className=" font-semibold text-xl">
            {shiftDetails?.singleHospital?.hospital?.hospitalName}
          </h2>
          <p className=" text-xs mt-1 text-gray-600">
            {shiftDetails?.singleHospital?.specialization}
          </p>

          <section className=" flex justify-between">
            <div className=" mt-10">
              <p className=" flex items-center mt-2 gap-2 text-sm">
                <IoCalendarClearOutline />

                <span>{formatDate(shiftDetails?.singleHospital?.date)}</span>
              </p>

              <p className=" flex items-center mt-2 gap-2 text-sm">
                <FaRegClock />

                <span>{shiftDetails?.singleHospital?.duration}</span>
              </p>

              <p className=" flex items-center mt-2 gap-2 text-sm">
                <IoLocationOutline />

                <span> {shiftDetails?.singleHospital?.location}</span>
              </p>

              <p className=" flex items-center mt-2 gap-2 text-sm">
                <BsCashCoin />

                <span> {shiftDetails?.singleHospital?.payRate}</span>
              </p>
            </div>

            <div>
              <p className=" text-sm">
                Contract: {shiftDetails?.singleHospital?.jobType}
              </p>
            </div>
          </section>

          <hr className=" my-4" />

          <section className="flex justify-between flex-wrap gap-5">
            <div>
              <h3 className=" font-semibold">Required Skills:</h3>

              <div className="flex items-center gap-3 flex-wrap mt-2">
                {shiftDetails?.singleHospital?.skills?.map((skill, i) => (
                  <p key={i} className="text-sm bg-blue-200 p-2 rounded-lg">
                    {skill}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h3 className=" font-semibold">Special Requirement:</h3>
              <p className=" text-sm">
                {shiftDetails?.singleHospital?.specialRequirement}
              </p>
            </div>
          </section>

          <hr className=" my-4" />

          <div>
            <h3 className=" font-semibold">Description:</h3>
            <p className=" mt-1 text-sm text-gray-600">
              {shiftDetails?.singleHospital?.adsNote}
            </p>
          </div>
        </section>
      )}

      {loading ? (
        <ShiftDetailsSkeleton num={1} className="w-full h-[400px]" />
      ) : (
        <section className="border shadow rounded-md p-4">
          <h2 className=" font-semibold text-xl">Hospital Information</h2>

          <div className=" mt-14 space-y-4">
            <p className=" flex items-center mt-2 gap-2 text-sm">
              <FaRegHospital />

              <span>
                {" "}
                {shiftDetails?.singleHospital?.hospital?.hospitalName}
              </span>
            </p>

            <p className="flex items-center mt-2 gap-2 text-sm">
              <IoLocationOutline />

              {shiftDetails?.singleHospital?.hospital?.address ? (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    shiftDetails?.singleHospital?.hospital?.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shiftDetails?.singleHospital?.hospital?.address}
                </a>
              ) : (
                <span>No address available</span>
              )}
            </p>

            <p className=" flex items-center mt-2 gap-2 text-sm">
              <IoCallOutline />

              <a
                href={`tel:${shiftDetails?.singleHospital?.hospital?.phoneNumber}`}
              >
                {shiftDetails?.singleHospital?.hospital?.phoneNumber}
              </a>
            </p>

            <p className=" flex items-center mt-2 gap-2 text-sm">
              <CiMail />

              <a
                href={`mailto:${shiftDetails?.singleHospital?.hospital?.phoneNumber}`}
              >
                {shiftDetails?.singleHospital?.hospital?.email}
              </a>
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default HealthCareShiftDetails;
