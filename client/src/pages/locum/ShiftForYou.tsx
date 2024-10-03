import { useState, useEffect } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
interface Shift {
  id: number;
  payRate: string;
  location: string;
  adsNote: string;
  date: string;
  imageUrl: string;
}

const ShiftForYou = () => {
  const [activeTab, setActiveTab] = useState<"available" | "upcoming">(
    "available"
  );
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch(
          "https://curaflux-server.onrender.com/hospital/getAllHospitals"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Shift[] = await response.json();
        setShifts(data);
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

    fetchShifts();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loaders">
          <div></div>
        </div>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <ScreenLayout>
      <div className="p-4 ">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-t-lg border-b-4 ${
              activeTab === "available"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("available")}
          >
            Available Shifts
          </button>
          <button
            className={`px-4 py-2 rounded-t-lg border-b-4 ${
              activeTab === "upcoming"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Shifts
          </button>
        </div>

        {/* Heading */}
        {/* <h2 className="text-2xl font-semibold mb-6">
          Select The <span className="text-blue-500">Shifts</span> That{" "}
          <span className="text-blue-500">Works Best For You!</span>
        </h2> */}

        {/* Shifts List */}
        <div className="space-y-4">
          {shifts.map(shift => (
            <div
              key={shift.id}
              className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 shadow-md rounded-lg space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <img
                src={shift.imageUrl}
                alt={shift.payRate}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  Posted {shift.date}
                </p>
                <h3 className="text-xl font-semibold">{shift.payRate}</h3>
                <p className="text-gray-600">{shift.location}</p>
                <p className="text-gray-700 mt-2">{shift.adsNote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ShiftForYou;
