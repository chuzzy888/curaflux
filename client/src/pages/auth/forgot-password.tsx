import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
// import { useNavigate } from "react-router-dom";
import signupImg from "../../assets/images/signUp.png";
import AuthFooter from "../../components/footer/AuthFooter";
import { SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "../../hooks/use-toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
// import GoogleSignInButton from "../../components/auth/google/GoogleSignInButton";

type forgotType = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<forgotType>();

  const { toast } = useToast();
//   const navigate = useNavigate();

  const handleForgotPassword: SubmitHandler<forgotType> = async (form) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/forgot-password`,
        form
      );

      console.log(data);

      Cookies.set("token", data.token);

      toast({
        title: "Email Verification Successful",
        description: "Please check your email to continue",
      });

      //   navigate("/shift");
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
            <form onSubmit={handleSubmit(handleForgotPassword)}>
              <div className="flex justify-center flex-col items-center">
                <h1 className="text-xl font-black">Forgot Password</h1>
              </div>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />

              <div className=" space-y-1">
                <Label htmlFor="email" className=" font-semibold text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className=" placeholder:text-[#D9D9D9]"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-[11px]">
                    Please enter your email address
                  </p>
                )}
              </div>

              <Button
                className="w-full bg-[#009FF5] rounded-full mt-7"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Verifying" : "Forgot Password"}
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

export default ForgotPassword;
