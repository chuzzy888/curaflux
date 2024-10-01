import { useState } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";

const ShiftForYou = () => {
  const [activeTab, setActiveTab] = useState("available");

  const shifts = [
    {
      id: 1,
      title: "Medics Teaching Hospital",
      address: "23, Ozumba Mbadiwe Ave, Eti-Osa, Lagos, Nigeria",
      description:
        "We seek skilled physiotherapists or nurses with expertise in musculoskeletal therapy, post-operative care, and mobility improvement available for shifts...",
      postedAgo: "7 mins ago",
      imageUrl:
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 1,
      title: "Medics Teaching Hospital",
      address: "23, Ozumba Mbadiwe Ave, Eti-Osa, Lagos, Nigeria",
      description:
        "We seek skilled physiotherapists or nurses with expertise in musculoskeletal therapy, post-operative care, and mobility improvement available for shifts...",
      postedAgo: "7 mins ago",
      imageUrl:
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 1,
      title: "Medics Teaching Hospital",
      address: "23, Ozumba Mbadiwe Ave, Eti-Osa, Lagos, Nigeria",
      description:
        "We seek skilled physiotherapists or nurses with expertise in musculoskeletal therapy, post-operative care, and mobility improvement available for shifts...",
      postedAgo: "7 mins ago",
      imageUrl:
        "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

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
                alt={shift.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <p className="text-gray-500 text-sm mb-2">
                  Posted {shift.postedAgo}
                </p>
                <h3 className="text-xl font-semibold">{shift.title}</h3>
                <p className="text-gray-600">{shift.address}</p>
                <p className="text-gray-700 mt-2">{shift.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScreenLayout>
  );
};

export default ShiftForYou;
