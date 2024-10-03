import { useState } from "react";
import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import AuthFooter from "../../../components/footer/AuthFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import signin from "../../../assets/images/signin.png";
import { Modal } from "../../../components/modals/Success-Modal";
// import { jwtDecode, JwtPayload } from "jwt-decode";

type loginType = {
  email: string;
  password: string;
};

// interface CustomJwtPayload extends JwtPayload {
//   hospitalName: string;
// }

const HospitalLogin = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<loginType>();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // const token = Cookies.get("healthcareToken");
  // const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;

  const handleLogin: SubmitHandler<loginType> = async (form) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hospital/login`,
        form
      );

      Cookies.set("healthcareToken", data?.healthcareToken);

      if (data.success === true) {
        setModalMessage("You have successfully logged in.");
        setIsModalOpen(true);

        // console.log(data);
        

        Cookies.set("healthcareVerified", "true");
        setTimeout(() => {
          navigate(
            `/curaflux/healthcare/admin`
          );
        }, 2000);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      setModalMessage(
        axiosError?.response?.data?.message ||
          "An error occurred during registration."
      );
      setIsModalOpen(true);
    }
  };

  return (
    <ScreenLayout>
      <Modal
        msg={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <main className="h-screen flex justify-center flex-col">
        <section className=" lg:flex justify-center items-center gap-32">
          <section className=" w-[502px] h-[502px] hidden lg:block">
            <img src={signin} alt="" className=" w-full" />
          </section>

          <section className=" lg:w-[521px] h-[570px] border p-10 border-black rounded-2xl">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="flex justify-center flex-col items-center">
                <h1 className="text-xl font-black">Welcome Back! Sign In</h1>
              </div>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />

              <div className=" space-y-1">
                <Label htmlFor="email" className=" font-semibold text-sm">
                  Email or Phone number
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email or Phone number"
                  className=" placeholder:text-[#D9D9D9]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-[11px]">
                    Please enter your email address
                  </p>
                )}
              </div>

              <div className=" space-y-1 mt-3 relative">
                <Label htmlFor="password" className=" font-semibold text-sm">
                  Password
                </Label>
                <Input
                  id="password"
                  type={!show ? "password" : "text"}
                  placeholder="Password"
                  className=" placeholder:text-[#D9D9D9] relative"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-[11px]">
                    Please enter your password
                  </p>
                )}

                <div className=" absolute top-[30px] right-2">
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? (
                      <FaRegEyeSlash size={16} />
                    ) : (
                      <FaRegEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <Link className="font-semibold text-sm" to={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>

              <Button
                className="w-full bg-[#009FF5] rounded-full mt-7"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Login"}
              </Button>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />

              <Link
                className="text-center flex justify-center text-sm gap-1 text-gray-400"
                to={"/register/healthcare"}
              >
                Don't have an account?{" "}
                <span className=" font-semibold text-black">Sign Up</span>
              </Link>
            </form>
          </section>
        </section>
        <AuthFooter />
      </main>
    </ScreenLayout>
  );
};

export default HospitalLogin;
