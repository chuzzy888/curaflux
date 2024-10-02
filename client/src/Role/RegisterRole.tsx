import { FaUserMd, FaHospital } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthFooter from "../components/footer/AuthFooter";

function RegisterRole() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 border">
      <div className="border border-blue-500 border-8 flex flex-col p-10 items-center justify-center ">
        <h1 className="text-3xl font-bold mb-4">Welcome to our platform</h1>
        <p className="text-lg text-gray-600 mb-8">
          Please select your role to Register
        </p>

        <div className="flex space-x-8">
          {/* Locum Register Option */}
          <Link to={"/register"}>
            <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg hover:bg-blue-100 shadow-lg cursor-pointer hover:shadow-xl transition-all">
              <FaUserMd className="text-4xl text-black mb-4" />
              <h2 className="text-xl font-semibold mb-2">Register as Locum</h2>
              <p className="text-gray-600 text-center">
                Access our platform as a locum healthcare professional.
              </p>
            </div>
          </Link>

          {/* Healthcare Facility Register Option */}
          <Link to={"/register/healthcare"}>
            <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg hover:bg-blue-100 shadow-lg cursor-pointer hover:shadow-xl transition-all">
              <FaHospital className="text-4xl text-black mb-4" />
              <h2 className="text-xl text-center font-semibold mb-2">
                Register as Healthcare Facility
              </h2>
              <p className="text-gray-600 text-center">
                Access our platform as a healthcare facility.
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="w-1/3 ">
        <AuthFooter />
      </div>
    </div>
  );
}

export default RegisterRole;
