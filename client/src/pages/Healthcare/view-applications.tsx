import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useApplicationStore } from "../../redux/store/application";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
// import { jwtDecode, JwtPayload } from "jwt-decode";

// interface CustomJwtPayload extends JwtPayload {
//   hospitalId: string;
// }

const ViewApplications = () => {
  const token = Cookies.get("healthcareToken");

  //   const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const { applicants, setApplicants } = useApplicationStore();
  //   console.log(decode);

  const getApplicants = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/shift/applicants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplicants(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplicants();
  }, []);

  console.log(applicants);

  return (
    <main className="p-8 ml-64 ">
      <section className="shadow w-fit flex p-5 rounded-lg">
        {applicants?.map((app) => (
          <div className=" flex gap-10">
            <img
              src={app.userId.photo}
              alt=""
              className="w-[100px] h-[100px] rounded-full"
            />

            <div className=" font-semibold space-y-2">
              <p>Name: {app.userId.fullName}</p>
              <p className=" capitalize">
                Specialty: {app?.userId?.specialty}{" "}
              </p>
              <p>Status: {app?.userId?.status} </p>
              <p>Experience: {app?.userId?.experience} </p>
            </div>

            <Link to={""}>
              {" "}
              <Button className=" bg-blue-400 mt-10" size={"sm"}>
                View Profile
              </Button>
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ViewApplications;
