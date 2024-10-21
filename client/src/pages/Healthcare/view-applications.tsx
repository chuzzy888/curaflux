import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useApplicationStore } from "../../redux/store/application";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { ShiftDetailsSkeleton } from "../../components/skeleton/shifts";
// import { jwtDecode, JwtPayload } from "jwt-decode";

// interface CustomJwtPayload extends JwtPayload {
//   hospitalId: string;
// }

const ViewApplications = () => {
  const token = Cookies.get("healthcareToken");

  const { applicants, setApplicants, loading, setLoading } =
    useApplicationStore();

  const getApplicants = async () => {
    try {
      setLoading(true);
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/shift/applicants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplicants(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicants();
  }, []);

  console.log(applicants);

  return (
    <main className="p-8 ml-64">
      <section className="grid grid-cols-2 2xl:grid-cols-3 rounded-lg gap-5">
        {loading
          ? Array.from({ length: applicants.length + 1 }).map((_, index) => (
              <ShiftDetailsSkeleton
                key={index}
                className="w-full h-[200px]"
                num={applicants.length}
              />
            ))
          : applicants?.map((app) => (
              <div className="flex gap-10 shadow w-fit p-5" key={app._id}>
                <img
                  src={app.userId.photo}
                  alt=""
                  className="w-[100px] h-[100px] rounded-full"
                />

                <div className="font-semibold space-y-2">
                  <p>Name: {app.userId.fullName}</p>
                  <p className="capitalize">
                    Specialty: {app?.userId?.specialty}{" "}
                  </p>
                  <p>Status: {app?.userId?.status} </p>
                  <p>Experience: {app?.userId?.experience} </p>
                </div>

                <Link
                  to={`/curaflux/healthcare/admin/applicant/profile/${app?._id}`}
                >
                  <Button className="bg-blue-400 mt-10" size={"sm"}>
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
