import { useState, useEffect } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Link } from "react-router-dom";
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
        console.log(data);
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
              className="flex flex-col sm:flex-row items-start bg-white p-4 shadow-md rounded-lg"
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
                  Posted {shift.date} ago
                </p>
                <h3 className="text-lg font-semibold mb-1">Medix care</h3>
                <p className="text-gray-600 mb-1">{shift.location}</p>
                <p className="text-gray-700 mt-2">{shift.adsNote}</p>
              </div>

              <div className="ml-auto">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
                  Apply Now
                </button>
                {/* later you can remove the view details link and wrap on the card instead */}
                <Link to={`/shifts/${shift.id}`}>view detail</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ShiftForYou;
