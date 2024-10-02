import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import signin from "../../../assets/images/signin.png";
// import "./step.css";
import AuthFooter from "../../../components/footer/AuthFooter";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { Checkbox } from "../../../components/ui/checkbox";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useToast } from "../../../hooks/use-toast";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import Cookies from "js-cookie";

type otpTypes = {
  otp: string;
};

export const HealthCareVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<otpTypes>();
  const { email } = useAuth();

  // Timer state
  const [timeLeft, setTimeLeft] = useState(60);

  // useEffect to handle the countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Convert seconds to minutes and seconds format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleSubmitOtp: SubmitHandler<otpTypes> = async (form) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/verify-otp`,
        form
      );

      if (data.success === true) {
        Cookies.set("healthcareVerified", "true");
        navigate("/curaflux/medixcare/admin");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;

      toast({
        title: "OTP Error",
        description: axiosError?.response?.data?.error || "Error verifying otp",
      });
    }
  };

  const resendOtp = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/resend-otp`,
      {
        email,
      }
    );

    if (data) {
      setTimeLeft(300); // Reset the timer to 5 minutes
      return toast({
        title: "OTP sent",
        description: `Your OTP has been sent to ${email} successfully.`,
      });
    }
  };

  return (
    <ScreenLayout>
      <main className="h-screen flex justify-center flex-col">
        <section className="lg:flex justify-center items-center gap-32">
          <section className="w-[502px] h-[502px] hidden lg:block">
            <img src={signin} alt="" className="w-full" />
          </section>

          <section className="lg:w-[521px] border p-10 border-black rounded-2xl">
            <div className="step3 h-[4px] w-full mb-5">{/* stepper */}</div>

            <div className="flex gap-1 items-center">
              <div className="">
                <h1 className="text-xl font-bold">Confirm your email</h1>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmitOtp)}>
              <div className="">
                <p className="text-[13px] py-6">
                  Enter the code we sent to{" "}
                  <span className="font-semibold">{email}</span> if you didn’t
                  get the email, check your junk folder or{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={resendOtp}
                  >
                    try again
                  </span>
                </p>

                <div className="flex justify-center">
                  <Controller
                    name="otp"
                    control={control}
                    rules={{
                      required: "OTP is required",
                      minLength: 6,
                      maxLength: 6,
                    }}
                    render={({ field }) => (
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    )}
                  />
                </div>
                {errors.otp && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.otp.message}
                  </p>
                )}

                <div className="flex items-center space-x-2 mt-8 border border-gray-400 p-5 rounded-2xl">
                  <Checkbox id="terms" className="border-gray-300" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I will like information, tips and offers about CuraFlux
                    products and services
                  </label>
                </div>

                <p className="text-xs text-gray-300 mt-7">
                  Choosing SignUp means that you agree to the CuraFlux Services
                  Agreement and privacy and cookies statement.
                </p>

                <div className="mt-4">
                  <p className="text-gray-500 text-sm">
                    Resend OTP in: <strong>{formatTime(timeLeft)}</strong>
                  </p>
                </div>
              </div>

              <Button className="w-full bg-[#009FF5] rounded-full mt-10">
                Sign Up
              </Button>
            </form>
          </section>
        </section>
        <AuthFooter />
      </main>
    </ScreenLayout>
  );
};
