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

const HealthCareShiftDetails = () => {
  const { shiftId } = useParams();

  const healthcareToken = Cookies.get("healthcareToken");

  const { shiftDetails, setShiftDetails } = useShiftStore();

  const getShiftDetails = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/hospital/getHospitalById/${shiftId}`,
        {
          headers: { Authorization: `Bearer ${healthcareToken}` },
        }
      );

      setShiftDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(shiftDetails);
  useEffect(() => {
    getShiftDetails();
  }, [shiftId]);

  return (
    <main className=" p-8 ml-64 grid grid-cols-2 gap-6">
      <section className="border shadow rounded-md p-4">
        <h2 className=" font-semibold text-xl">
          {shiftDetails?.hospital?.hospitalName}
        </h2>
        <p className=" text-xs mt-1 text-gray-600">
          {shiftDetails?.specialization}
        </p>

        <div className=" mt-10">
          <p className=" flex items-center mt-2 gap-2 text-sm">
            <IoCalendarClearOutline />

            <span>{formatDate(shiftDetails?.date)}</span>
          </p>

          <p className=" flex items-center mt-2 gap-2 text-sm">
            <FaRegClock />

            <span>{shiftDetails?.duration}</span>
          </p>

          <p className=" flex items-center mt-2 gap-2 text-sm">
            <IoLocationOutline />

            <span> {shiftDetails?.location}</span>
          </p>

          <p className=" flex items-center mt-2 gap-2 text-sm">
            <BsCashCoin />

            <span> {shiftDetails?.payRate}</span>
          </p>
        </div>

        <hr className=" my-4" />

        <div>
          <h3 className=" font-semibold">Required Skills:</h3>
        </div>

        <hr className=" my-4" />

        <div>
          <h3 className=" font-semibold">Description:</h3>
          <p className=" mt-1 text-sm text-gray-600">{shiftDetails?.adsNote}</p>
        </div>
      </section>

      <section className="border shadow rounded-md p-4">
        <h2 className=" font-semibold text-xl">Hospital Information</h2>

        <div className=" mt-14 space-y-4">
          <p className=" flex items-center mt-2 gap-2 text-sm">
            <FaRegHospital />

            <span> {shiftDetails?.hospital?.hospitalName}</span>
          </p>

          <p className=" flex items-center mt-2 gap-2 text-sm">
            <IoLocationOutline />

            <span> {shiftDetails?.hospital?.address}</span>
          </p>

          <p className=" flex items-center mt-2 gap-2 text-sm">
            <IoCallOutline />

            <a href={`tel:${shiftDetails?.hospital?.phoneNumber}`}>
              {shiftDetails?.hospital?.phoneNumber}
            </a>
          </p>

          <p className=" flex items-center mt-2 gap-2 text-sm">
            <CiMail />

            <a href={`mailto:${shiftDetails?.hospital?.phoneNumber}`}>
              {shiftDetails?.hospital?.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default HealthCareShiftDetails;
