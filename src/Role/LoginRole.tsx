import { Link } from "react-router-dom";
import fr from "../assets/images/fr.png";
import fre from "../assets/images/fre.png";
import AuthFooter from "../components/footer/AuthFooter";

function LoginRole() {
  return (
    <div className="flex h-screen flex-col justify-center items-center  ">
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-20 gap-10">
        <Link to={"/login"}>
          <div className="flex flex-col gap-3">
            <img src={fr} alt="" className="md:h-80 h-60" />
            <p className="text-center md:text-2xl text-lg font-bold text-blue-500  hover:text-blue-700">
              Login as Locum
            </p>
          </div>
        </Link>
        <Link to={"/login/healthcare"}>
          <div className="flex flex-col justify-center items-center gap-3">
            <img src={fre} alt="" className="md:h-80 h-60 w-full" />
            <p className="text-center md:text-2xl text-lg font-bold text-blue-500 hover:text-blue-700">
              Login as Healthcare
            </p>
          </div>
        </Link>
      </div>
      <div className="w-full md:w-1/2">
        <AuthFooter />
      </div>
    </div>
  );
}

export default LoginRole;
