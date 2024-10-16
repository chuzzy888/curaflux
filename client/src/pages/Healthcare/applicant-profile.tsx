import { useEffect, useState } from "react";
import useAuthStore from "../../redux/store/authStore";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaLinkedinIn,
  //   FaStar,
} from "react-icons/fa";
import { Button } from "../../components/ui/button";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { ShiftDetailsSkeleton } from "../../components/skeleton/shifts";
import { Spinner } from "../../components/spinner/Spinner";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

type appStatusTypes = "accepted" | "rejected" | "pending";

const ApplicantProfile = () => {
  const { userInfo, setUserInfo, loading, setLoading } = useAuthStore();

  const locumToken = Cookies.get("locumToken");
  const decode = locumToken ? jwtDecode<CustomJwtPayload>(locumToken) : null;
  const [applicationStatus, setApplicationStatus] =
    useState<appStatusTypes | null>(null);

  const { userId } = useParams();

  const getAUserInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/shift/applicants/${userId}`
      );

      setUserInfo(data.user.userId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAUserInfo();
  }, [decode?.userId]);

  const handleAcceptShift = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/shift/application/accepted/${userId}`,
        { status: "accept" }
      );

      //   console.log(data);
      setApplicationStatus("accepted"); // Update state to show accepted
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleRejectShift = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/shift/application/rejected/${userId}`
      );

      //   console.log(data);

      setApplicationStatus("rejected"); // Update state to show rejected
      setLoading(false);
      window.location.href = "/curaflux/healthcare/admin/applications";
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/shift/applicants/${userId}`
        );
        setApplicationStatus(data.user?.status || null);

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch application status:", error);
      }
    };

    fetchApplicationStatus();
  }, [userId]);

  console.log(applicationStatus);

  return (
    <main className=" pt-10 ml-64">
      <ScreenLayout>
        <section className=" flex items-center gap-14 relative">
          <Link
            to={"/curaflux/healthcare/admin/applications"}
            className=" absolute top-5"
          >
            <FaArrowLeft />
          </Link>
          {loading ? (
            <ShiftDetailsSkeleton
              className="w-[200px] h-[200px] rounded-full"
              num={1}
            />
          ) : (
            <div>
              <img
                src={
                  userInfo?.photo ||
                  "https://imgs.search.brave.com/2pODr3EgS5gALfXBmOAurXtyMGRVSrH5S4Kffrvx0XY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8xNTAt/MTUwMzk0NV90cmFu/c3BhcmVudC11c2Vy/LXBuZy1kZWZhdWx0/LXVzZXItaW1hZ2Ut/cG5nLXBuZy5wbmc"
                }
                alt="User-profile-photo"
                className="h-[200px] w-[200px] object-cover rounded-full"
              />
            </div>
          )}

          {loading ? (
            <ShiftDetailsSkeleton num={1} className="w-[700px] h-[200px]" />
          ) : (
            <div>
              <div className=" flex items-center justify-between gap-40">
                <h1 className="text-3xl font-bold pb-1">
                  {userInfo?.fullName}
                </h1>

                <div className="space-x-5">
                  {applicationStatus === "pending" && (
                    <>
                      <Button
                        className="bg-blue-400"
                        onClick={handleAcceptShift}
                      >
                        {loading ? <Spinner /> : "Accept"}
                      </Button>
                      <Button
                        className="bg-transparent border text-black border-blue-400 hover:text-white"
                        onClick={handleRejectShift}
                      >
                        {loading ? <Spinner /> : "Decline"}
                      </Button>
                    </>
                  )}
                  {applicationStatus === "accepted" && (
                    <Button className="bg-green-400" disabled>
                      Accepted
                    </Button>
                  )}
                </div>
              </div>

              <p className=" pb-1 text-gray-500 text-[16px] capitalize">
                Registered {userInfo?.specialty}
              </p>

              <p className=" pb-1 text-gray-500 text-[16px] flex gap-2 items-center">
                <FaCalendarAlt /> {userInfo?.experience || "Not updated"}
              </p>

              <p className="pb-1 text-gray-500 text-[16px] flex gap-2 items-center">
                <FaLinkedinIn />
                <a
                  href={`https://${userInfo?.linkedInUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:underline"
                >
                  LinkedIn Profile
                </a>
              </p>

              {/* <p className=" mt-7 pb-1 text-gray-500 text-[16px] max-w-3xl">
              {userInfo?.bio || "Not updated"}
            </p> */}

              <div
                className=" mt-7 pb-1 text-gray-500 text-[16px] max-w-3xl"
                dangerouslySetInnerHTML={{
                  __html: userInfo?.bio || "Not updated",
                }}
              ></div>
            </div>
          )}
        </section>
        <div className=" h-[0.5px] w-full bg-gray-300 my-10"></div>

        {loading ? (
          <ShiftDetailsSkeleton num={1} className="w-full h-[100px]" />
        ) : (
          <section>
            <h1 className="text-xl font-bold pb-1">Certifications</h1>

            <div>
              {userInfo?.certifications &&
              userInfo?.certifications.length === 0 ? (
                <p>Not updated</p>
              ) : (
                userInfo?.certifications?.map((cert, index) => (
                  <div key={index}>{cert}</div>
                ))
              )}
            </div>
          </section>
        )}

        <div className=" h-[0.5px] w-full bg-gray-300 my-10"></div>

        {loading ? (
          <ShiftDetailsSkeleton num={1} className=" w-full h-[150px]" />
        ) : (
          <section className=" flex justify-between gap-10  w-9/12">
            <div>
              <h1 className="text-xl font-bold pb-2">Availability</h1>

              <p className=" pb-1 text-gray-500 text-[14px] flex gap-2 items-center">
                <FaCalendarAlt /> {userInfo?.availableWork || "Not updated"}
              </p>

              <p className=" pt-1 text-gray-500 text-[14px] flex gap-2 items-center">
                <FaCalendarAlt /> {userInfo?.availableTime || "Not updated"}
              </p>
            </div>
            {/* <div>
            <h1 className="text-xl font-bold pb-1">Ratings</h1>

            <div className=" flex items-center gap-1 pt-2">
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />
              <FaStar color="yellow" />
            </div>
          </div> */}
            {/* <div>
            <h1 className="text-xl font-bold pb-1">Completed Shifts</h1>

            <p className=" pt-1 text-gray-500 text-[14px] flex gap-2 items-center">
              <FaCalendarAlt /> {userInfo?.availability || "Soon"}
            </p>

            <p className=" pt-1 text-gray-500 text-[14px] flex gap-2 items-center">
              <FaCalendarAlt /> {userInfo?.lastShift || "Soon"}
            </p>
          </div> */}
          </section>
        )}

        <div className=" h-[0.5px] w-full bg-gray-300 my-10"></div>
      </ScreenLayout>
    </main>
  );
};

export default ApplicantProfile;
