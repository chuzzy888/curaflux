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

interface Step3Props {
  prevStep: () => void;
  currentStep: number;
  //   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   formData: { email: string; password: string };
}

export const Step3 = ({ prevStep, currentStep }: Step3Props) => {
  return (
    <ScreenLayout>
      {" "}
      <main className="h-screen flex justify-center flex-col">
        <section className=" flex justify-between items-center  w-full">
          <section className=" w-full">
            <img src={signin} alt="" />
          </section>

          <section className=" w-[60%] border-4 p-10  border-blue-500 rounded-2xl">
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

            <div className="">
              <p className=" text-[13px] py-6">
                Enter the code we sent to{" "}
                <span className=" font-semibold">name@mail.com</span> if you
                didn’t get the email, check your junk folder or{" "}
                <span className=" text-blue-500">try again</span>
              </p>

              <div className=" flex justify-center">
                <InputOTP maxLength={6}>
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
              </div>

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
              type="button"
              //   onClick={nextStep}
            >
              Sign Up
            </Button>
          </section>
        </section>
        <AuthFooter />
      </main>
    </ScreenLayout>
  );
};
