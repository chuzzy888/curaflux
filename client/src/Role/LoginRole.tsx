import { FaUserMd, FaHospital } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginRole() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to our platform</h1>
      <p className="text-lg text-gray-600 mb-8">
        Please select your role to continue:
      </p>

      <div className="flex space-x-8">
        {/* Locum Login Option */}
        <Link to={"/login"}>
          <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg hover:bg-blue-100 shadow-lg cursor-pointer hover:shadow-xl transition-all">
            <FaUserMd className="text-4xl text-black mb-4" />
            <h2 className="text-xl font-semibold mb-2">Login as Locum</h2>
            <p className="text-gray-600 text-center">
              Access our platform as a locum healthcare professional.
            </p>
          </div>
        </Link>

        {/* Healthcare Facility Login Option */}
        <Link to={"/login/healthcare"}>
          <div className="flex flex-col items-center justify-center w-64 p-6 bg-white rounded-lg hover:bg-blue-100 shadow-lg cursor-pointer hover:shadow-xl transition-all">
            <FaHospital className="text-4xl text-black mb-4" />
            <h2 className="text-xl text-center font-semibold mb-2">
              Login as Healthcare Facility
            </h2>
            <p className="text-gray-600 text-center">
              Access our platform as a healthcare facility.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LoginRole;
