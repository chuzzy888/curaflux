import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import signin from "../../../assets/images/signin.png";
import "./step.css";
import AuthFooter from "../../../components/footer/AuthFooter";

import { Button } from "../../ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import { Checkbox } from "../../../components/ui/checkbox";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { useToast } from "../../../hooks/use-toast";

interface Step3Props {
  prevStep: () => void;
  currentStep: number;
}

type otpTypes = {
  otp: string;
};

export const Step3 = ({ prevStep, currentStep }: Step3Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    formState: { errors },
    handleSubmit,
    control,
    // reset,
  } = useForm<otpTypes>();
  const { email } = useAuth();

  const handleSubmitOtp: SubmitHandler<otpTypes> = async (form) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/verify-otp`,
      form
    );

    if (data.success === true) {
      navigate("/verify");
    }

    // console.log(data.success === true);
  };

  const resendOtp = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/resend-otp`,
      {
        email,
      }
    );

    if (data) {
      return toast({
        title: "Otp sent",
        description: `Your otp have been sent to ${email} successfully`,
      });
    }
  };

  return (
    <ScreenLayout>
      {" "}
      <main className="h-screen flex justify-center flex-col">
        <section className=" lg:flex justify-center items-center  gap-32">
          <section className=" w-[502px] h-[502px] hidden lg:block">
            <img src={signin} alt="" className=" w-full" />
          </section>

          <section className=" lg:w-[521px] border p-10 border-black rounded-2xl">
            <div className=" step3 h-[4px] w-full mb-5">{/* stepper */}</div>

            <div className=" flex gap-1 items-center">
              <div>
                <button onClick={prevStep} className=" text-[11px]">
                  <IoArrowUndoSharp />
                </button>
              </div>

              <div className=" ">
                <p className=" text-gray-400 text-xs mb-1">
                  Step {currentStep} of 3
                </p>
                <h1 className="text-xl font-bold">Confirm your email</h1>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSubmitOtp)}>
              <div className="">
                <p className=" text-[13px] py-6">
                  Enter the code we sent to{" "}
                  <span className=" font-semibold">{email}</span> if you didn’t
                  get the email, check your junk folder or{" "}
                  <span
                    className=" text-blue-500 cursor-pointer"
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
                  <Checkbox id="terms" className=" border-gray-300" />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I will like information, tips and offers about CuraFlux
                    products and services
                  </label>
                </div>

                <p className=" text-xs text-gray-300 mt-7">
                  Choosing SignUp means that you agree to the CuraFlux Services
                  Agreement and privacy and cookies statement.
                </p>
              </div>

              <Button
                className=" w-full bg-[#009FF5] rounded-full mt-10"
                // type="button"
                //   onClick={nextStep}
              >
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
