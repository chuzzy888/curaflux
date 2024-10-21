import { useEffect } from "react";
import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import useAuthStore from "../../../redux/store/authStore";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaLinkedinIn,
  // FaStar
} from "react-icons/fa";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";
import { ShiftDetailsSkeleton } from "../../../components/skeleton/shifts";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const Profile = () => {
  const { userInfo, setUserInfo, loading, setLoading } = useAuthStore();
  const locumToken = Cookies.get("locumToken");
  const decode = locumToken ? jwtDecode<CustomJwtPayload>(locumToken) : null;

  const getAUserInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/auth/user/${decode?.userId}`
      );

      setUserInfo(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAUserInfo();
  }, [decode?.userId]);

  return (
    <main className=" pt-7 lg:pt-20">
      <ScreenLayout>
        <section className=" lg:flex items-center gap-14 relative">
          <Link to={"/shift"} className=" absolute top-5">
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
                  userInfo.photo ||
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
              <div className=" flex items-center justify-between lg:gap-40">
                <h1 className="text-3xl font-bold pb-1">{userInfo.fullName}</h1>

                <Link to={`/edit-profile-${userInfo.nickName}/${userInfo._id}`}>
                  <Button size={"sm"} className="bg-[#009FF5]">
                    Edit Profile
                  </Button>
                </Link>
              </div>

              <p className=" pb-1 text-gray-500 text-[16px] capitalize">
                Registered {userInfo.specialty}
              </p>

              <p className=" pb-1 text-gray-500 text-[16px] flex gap-2 items-center">
                <FaCalendarAlt /> {userInfo.experience || "Not updated"}
              </p>

              <p className="pb-1 text-gray-500 text-[16px] flex gap-2 items-center">
                <FaLinkedinIn />
                <a
                  href={`https://${userInfo.linkedInUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:underline"
                >
                  LinkedIn Profile
                </a>
              </p>

              {/* <p className=" mt-7 pb-1 text-gray-500 text-[16px] max-w-3xl">
              {userInfo.bio || "Not updated"}
            </p> */}

              <div
                className=" mt-7 pb-1 text-gray-500 text-[16px] max-w-3xl"
                dangerouslySetInnerHTML={{
                  __html: userInfo.bio || "Not updated",
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
              {userInfo.certifications &&
              userInfo.certifications.length === 0 ? (
                <p>Not updated</p>
              ) : (
                userInfo.certifications?.map((cert, index) => (
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
                <FaCalendarAlt /> {userInfo.availableWork || "Not updated"}
              </p>

              <p className=" pt-1 text-gray-500 text-[14px] flex gap-2 items-center">
                <FaCalendarAlt /> {userInfo.availableTime || "Not updated"}
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
              <FaCalendarAlt /> {userInfo.availability || "Soon"}
            </p>

            <p className=" pt-1 text-gray-500 text-[14px] flex gap-2 items-center">
              <FaCalendarAlt /> {userInfo.lastShift || "Soon"}
            </p>
          </div> */}
          </section>
        )}

        <div className=" h-[0.5px] w-full bg-gray-300 my-10"></div>
      </ScreenLayout>
    </main>
  );
};

export default Profile;
