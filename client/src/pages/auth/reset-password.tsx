import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import signupImg from "../../assets/images/signUp.png";
import AuthFooter from "../../components/footer/AuthFooter";
import { SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "../../hooks/use-toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

type resetType = {
  password: string;
};

const ResetPassword = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<resetType>();

  const { toast } = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const locumToken = Cookies.get("locumToken");

  const handleResetPassword: SubmitHandler<resetType> = async (form) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/auth/reset-password/${locumToken}`,
        form
      );

      // console.log(data);

      Cookies.remove("locumToken");

      toast({
        title: "Password Changed Successful",
        description: "Login to continue",
      });

      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      toast({
        title: "Error Found",
        description:
          axiosError?.response?.data?.message ||
          "An error occurred during login.",
      });
    }
  };

  return (
    <ScreenLayout>
      <main className="h-screen flex justify-center flex-col">
        <section className=" lg:flex justify-center items-center gap-32">
          <section className=" w-[502px] h-[502px] hidden lg:block">
            <img src={signupImg} alt="" className=" w-full" />
          </section>

          <section className=" lg:w-[521px]  border p-10 border-black rounded-2xl">
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <div className="flex justify-center flex-col items-center">
                <h1 className="text-xl font-black">Reset Your Password</h1>
              </div>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />

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

              <Button
                className="w-full bg-[#009FF5] rounded-full mt-7"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Updating" : "Reset Password"}
              </Button>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />
            </form>
          </section>
        </section>
        <AuthFooter />
      </main>
    </ScreenLayout>
  );
};

export default ResetPassword;
