import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import "./step.css";

import { Input } from "../../../components/ui/input";
import signin from "../../../assets/images/signin.png";

import AuthFooter from "../../../components/footer/AuthFooter";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { IoArrowUndoSharp } from "react-icons/io5";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  //   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   formData: { email: string; password: string };
}

export const Step2 = ({ nextStep, prevStep, currentStep }: Step2Props) => {
  return (
    <ScreenLayout>
      {" "}
      <main className="h-screen flex justify-center flex-col">
        <section className=" flex justify-between items-center  w-full">
          <section className=" w-full">
            <img src={signin} alt="" />
          </section>

          <section className=" w-[60%] border-4 p-10  border-blue-500 rounded-2xl">
            <div className=" step2 h-[4px] w-full mb-5">{/* stepper */}</div>

            <form>
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
                  <h1 className="text-xl font-bold">Tell us about yourself</h1>
                </div>
              </div>

              <div className=" space-y-1">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Full name
                </Label>
                <Input
                  type="text"
                  placeholder="Full name"
                  className=" placeholder:text-[#D9D9D9]"
                />
              </div>

              <div className=" space-y-1 mt-3">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Name
                </Label>
                <p className=" text-[11px] text-gray-300">
                  This is the name that will appear on your profile
                </p>
                <Input
                  type="text"
                  placeholder="Nickname"
                  className=" placeholder:text-[#D9D9D9]"
                />
              </div>

              <div className=" space-y-1 mt-3">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Birthdate
                </Label>
                <p className=" text-[11px] text-gray-300">
                  why do we need your date of birth?{" "}
                  <span className=" underline">Learn More.</span>
                </p>
                <Input
                  type="text"
                  placeholder="MM/DD/YYY"
                  className=" placeholder:text-[#D9D9D9]"
                />
              </div>

              <div className=" space-y-1 mt-3">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Gender
                </Label>

                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className=" w-full bg-[#009FF5] rounded-full mt-10"
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>
            </form>
          </section>
        </section>
        <AuthFooter />
      </main>
    </ScreenLayout>
  );
};
