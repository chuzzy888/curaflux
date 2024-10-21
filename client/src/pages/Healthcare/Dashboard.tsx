import axios from "axios";
import Cookies from "js-cookie";
import Marquee from "react-fast-marquee";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect } from "react";
import { useShiftStore } from "../../redux/store/shiftStore";
import { useApplicationStore } from "../../redux/store/application";

interface CustomJwtPayload extends JwtPayload {
  hospitalId: string;
}

export default function Dashboard() {
  const healthcareToken = Cookies.get("healthcareToken");
  const decode = healthcareToken
    ? jwtDecode<CustomJwtPayload>(healthcareToken)
    : null;

  const { shiftsHealthcare, setShiftsHealthcare } = useShiftStore();
  const { applicants, setApplicants } = useApplicationStore();

  const getHealthcareShifts = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/hospital/getShiftForAHealthCare/${
          decode?.hospitalId
        }`
      );

      setShiftsHealthcare(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHealthcareShifts();

    const interval = setInterval(getHealthcareShifts, 4000); // do not remove. will change this flow later to socket io
    return () => clearInterval(interval);
  }, []);

  // <<<<<<<< HEAD:client/src/pages/Healthcare/Dashboard.tsx
  // console.log(shiftsHealthcare); //do not remove. will change this flow later to socket io

  // console.log(shiftsHealthcare); do not remove. will change this flow later to socket io
  // >>>>>>>> 4ac74538918c46212aef99b989ad0e95fe5631e3:client/src/components/health-care/Dashboard.tsx
  // console.log(shiftsHealthcare); do not remove. will change this flow later to socket io

  // console.log(shiftsHealthcare);

  const getApplicants = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/shift/applicants`,
        {
          headers: { Authorization: `Bearer ${healthcareToken}` },
        }
      );

      setApplicants(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplicants();

    const interval = setInterval(getApplicants, 4000);
    return () => clearInterval(interval);
  }, []);

  const checkActiveApplication = applicants.filter(
    (app) => app.status === "accepted"
  );


  const checkPendingApplication = applicants.filter(
    (app) => app.status === "pending"
  );

  return (
    <div className="p-8 ml-64 ">
      <Marquee pauseOnHover>
        <p className="pb-5 text-gray-600 text-sm">
          To ensure the best experience for all users, we require the completion
          of your profile before accessing our platform's features and benefits.
        </p>
      </Marquee>

      <div className="grid grid-cols-4 bg-blue-500 p-10 rounded-md gap-4 mb-8">
        <div className="bg-blue-50 shadow rounded-lg p-4">
          <h3 className="text-gray-600">Total Applications</h3>
          <p className="text-2xl font-bold">{applicants?.length}</p>
        </div>

        <div className="bg-green-50 shadow rounded-lg p-4">
          <h3 className="text-gray-600">Active Applications</h3>
          <p className="text-2xl font-bold text-green-500">
            {checkActiveApplication?.length}
          </p>
        </div>

        <div className="bg-purple-50 shadow rounded-lg p-4">
          <h3 className="text-gray-600">Pending Applications</h3>
          <p className="text-2xl font-bold text-purple-500">
            {checkPendingApplication?.length}
          </p>
        </div>

        <div className="bg-orange-50 shadow rounded-lg p-4">
          <h3 className="text-gray-600">Created Applications</h3>
          <p className="text-2xl font-bold text-orange-500">
            {" "}
            {shiftsHealthcare?.NumOfShifts}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-4">Active Jobs</h3>
          {checkActiveApplication.map((acc) => (
            <div className="bg-gray-100 shadow rounded-lg p-4  mb-4 overflow-y-auto max-h-96">
              <div className="shadow-lg bg-white p-5 rounded-md" key={acc._id}>
                <h4 className="text-blue-600 font-bold">
                  {acc?.shiftId?.jobType}
                </h4>
                <p>{acc?.shiftId?.adsNote}</p>
                <p className="text-gray-500">
                  Contract Period: {acc?.shiftId?.duration}
                </p>
                <p className="text-green-500 font-bold">
                  ₦{acc?.shiftId?.payRate}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Locum Contacts</h3>
          {checkActiveApplication.map((acc) => (
            <div
              className="bg-gray-100 shadow rounded-lg p-4 mb-4 overflow-y-auto max-h-96"
              key={acc.userId._id}
            >
              <div className="shadow-lg p-5  bg-white rounded-md">
                <h4 className="text-blue-600 font-bold capitalize">
                  {acc?.userId?.specialty}
                </h4>
                {acc?.userId?.specialty === "doctor" ? (
                  <p className="text-sm">
                    MDCN Number: {acc?.userId?.mdcnNumber}
                  </p>
                ) : (
                  <p className="text-sm">
                    NMCN Number: {acc?.userId?.nmcnNumber}
                  </p>
                )}
                <div className=" flex flex-col">
                  <a
                    href={`tel:${acc?.userId?.phoneNumber}`}
                    className="text-gray-500"
                  >
                    {acc?.userId?.phoneNumber}
                  </a>
                  <a
                    href={`mailto:${acc?.userId?.email}`}
                    className="text-green-500 font-bold"
                  >
                    {acc?.userId?.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
