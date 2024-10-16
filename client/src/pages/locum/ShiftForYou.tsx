import { useState, useEffect } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { format } from "timeago.js";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ShiftSkeleton } from "../../components/skeleton/shifts";

interface Shift {
  _id: string;
  payRate: string;
  location: string;
  adsNote: string;
  date: string;
  createdAt: string;
  imageUrl: string;
  hospital: {
    _id: string;
  };
}

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const ShiftForYou = () => {
  const [activeTab, setActiveTab] = useState<"available" | "upcoming">(
    "available"
  );
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appliedShifts, setAppliedShifts] = useState<Record<string, boolean>>(
    {}
  );
  const token = Cookies.get("locumToken");

  const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;

  const fetchShifts = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/hospital/getAllHospitals`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShifts(data.Hospitals);
      console.log(data);

      // Create a map of applied shifts
      const appliedShiftsMap = data.appliedShift.reduce(
        (
          acc: { [x: string]: boolean },
          application: { shiftId: string | number }
        ) => {
          acc[application.shiftId] = true;
          return acc;
        },
        {}
      );
      setAppliedShifts(appliedShiftsMap);
      // console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShifts();

    const getShiftInterval = setInterval(() => {
      fetchShifts();
    }, 5000);

    return () => clearInterval(getShiftInterval);
  }, []);

  const applyForShift = async (shiftId: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/shift/application`,
        { shiftId: shiftId, userId: decode?.userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the appliedShifts state
      setAppliedShifts((prev) => ({ ...prev, [shiftId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  const checkExactAvailableShiftDate = shifts?.filter((shift) => {
    const shiftDate = new Date(shift.date).toISOString().split("T")[0];
    const todayDate = new Date().toISOString().split("T")[0];
    return shiftDate === todayDate;
  });

  const checkExactUpComingShiftDate = shifts?.filter((shift) => {
    const shiftDate = new Date(shift.date).toISOString().split("T")[0];
    const todayDate = new Date().toISOString().split("T")[0];
    return shiftDate !== todayDate;
  });

  if (error) return <div>Error: {error}</div>;

  const renderShiftList = (shiftList: Shift[]) => (
    <div className="space-y-4">
      {loading ? (
        <ShiftSkeleton num={shiftList.length || 3} />
      ) : (
        shiftList?.map((shift) => (
          <div className="relative" key={shift._id}>
            {/* { console.log(shift.hospital._id)} */}
            <Link
              to={`/shifts/${shift._id}`}
              className="flex flex-col sm:flex-row items-start bg-white p-4 shadow-md rounded-lg hover:border-blue-400"
            >
              <div className="flex flex-col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg4fFT8h4q-vXnYeZqikC3UfbkHgmMtlUV6A&s"
                  alt=""
                  className="w-12 h-12 object-cover rounded-full mb-2"
                />
              </div>
              <div className="flex-1 ml-4">
                <p className="text-gray-500 text-sm mb-1">
                  Posted {format(shift.createdAt)}
                </p>
                <h3 className="text-lg font-semibold mb-1">Medix care</h3>
                <p className="text-gray-600 mb-1">{shift.location}</p>
                <p className="text-gray-700 mt-2">{shift.adsNote}</p>
              </div>
            </Link>
            <div className="ml-auto absolute top-16 right-5">
              <Button
                className={`text-white px-4 py-2 rounded-full ${
                  appliedShifts[shift?._id] && "cursor-not-allowed"
                } ${
                  appliedShifts[shift?._id]
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                size="sm"
                onClick={() => applyForShift(shift?._id)}
                disabled={appliedShifts[shift?._id]}
              >
                {appliedShifts[shift?._id] ? "Applied" : "Apply Now"}
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <ScreenLayout>
      <div className="p-4">
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-t-lg border-b-4 text-sm ${
              activeTab === "available"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Shifts
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg border-b-4 text-sm ${
              activeTab === "upcoming"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Shifts
          </button>
        </div>

        {activeTab === "available" && (
          <section>{renderShiftList(checkExactAvailableShiftDate)}</section>
        )}

        {activeTab === "upcoming" && (
          <section>{renderShiftList(checkExactUpComingShiftDate)}</section>
        )}
      </div>
    </ScreenLayout>
  );
};

export default ShiftForYou;
