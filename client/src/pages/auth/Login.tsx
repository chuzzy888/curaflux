import { useState } from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import signupImg from "../../assets/images/signUp.png";
import google from "../../assets/images/Google.png";
import AuthFooter from "../../components/footer/AuthFooter";
import { SubmitHandler, useForm } from "react-hook-form";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { useToast } from "../../hooks/use-toast";
import axios from "axios";

type loginType = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,

    // reset,
  } = useForm<loginType>();
  const [show, setShow] = useState(false);

  const { toast } = useToast();

  const handleLogin: SubmitHandler<loginType> = async (form) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signin`,
        form
      );

      console.log(data);

      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      console.log(error);

      toast({
        title: "Error Found",
        description: error as string,
      });
    }
  };

  return (
    <ScreenLayout>
      <main className="h-screen flex justify-center flex-col">
        <section className=" lg:flex justify-center items-center  gap-32">
          <section className=" w-[502px] h-[502px] hidden lg:block">
            <img src={signupImg} alt="" className=" w-full" />
          </section>

          <section className=" lg:w-[521px] h-[570px] border p-10 border-black rounded-2xl">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className=" flex justify-center flex-col items-center">
                <h1 className="text-xl font-black">Welcome Back! Sign In</h1>
                <button type="button" className="my-4">
                  <img src={google} alt="google-img" />
                </button>
              </div>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />

              <div className=" space-y-1">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Email or Phone number
                </Label>
                <Input
                  type="email"
                  placeholder="Email or Phone number"
                  className=" placeholder:text-[#D9D9D9] "
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-[11px]">
                    Please enter your email address
                  </p>
                )}
              </div>

              <div className=" space-y-1 mt-3 relative">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Password
                </Label>
                <Input
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
                  {!show ? (
                    <button type="button" onClick={() => setShow(!show)}>
                      <FaRegEye size={16} />
                    </button>
                  ) : (
                    <button type="button" onClick={() => setShow(!show)}>
                      <FaRegEyeSlash size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className=" mt-3 flex justify-between items-center">
                {/* <div className=" flex items-center gap-1">
                  <label
                    htmlFor="AcceptConditions"
                    className="relative inline-block h-5 w-10 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-sky-500"
                  >
                    <input
                      type="checkbox"
                      id="AcceptConditions"
                      className="peer sr-only"
                    />

                    <span className="absolute inset-y-0 start-0 m-0.5 size-4 rounded-full bg-white transition-all peer-checked:start-5"></span>
                  </label>
                  <Label className=" text-xs">Remember me</Label>
                </div> */}
                <Link
                  className=" font-semibold text-sm"
                  to={"/forgot-password"}
                >
                  Forgot Passowrd?
                </Link>
              </div>

              <Button
                className=" w-full bg-[#009FF5] rounded-full mt-7"
                disabled={!isValid}
              >
                {status === "loading" ? "Signing" : "Login"}
              </Button>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />

              <Link
                className=" text-center flex justify-center text-sm gap-1 text-gray-400"
                to={"/register"}
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

export default Login;
