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
import { InputTypes } from "../../../types/types";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
// import { useAuth } from "../../../context/authContext";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  register: UseFormRegister<InputTypes>;
  errors: FieldErrors<InputTypes>;
  control: Control<InputTypes>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isValid: boolean;
}

export const Step2 = ({
  // nextStep,
  prevStep,
  currentStep,
  errors,
  register,
  control,
  handleSubmit,
}: Step2Props) => {
  return (
    <ScreenLayout>
      {" "}
      <main className="h-screen flex justify-center flex-col">
        <section className=" flex justify-between items-center gap-20">
          <section className=" w-full">
            <img src={signin} alt="" className=" w-full" />
          </section>

          <section className=" w-[60%] border-4 p-10  border-blue-500 rounded-2xl">
            <div className=" step2 h-[4px] w-full mb-5">{/* stepper */}</div>

            <form onSubmit={handleSubmit}>
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
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-[11px]">
                    Please input your full name
                  </p>
                )}
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
                  {...register("nickName", { required: true })}
                />
                {errors.nickName && (
                  <p className="text-red-500 text-[11px]">
                    Please enter your nick name
                  </p>
                )}
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
                  {...register("birthdate", { required: true })}
                />
                {errors.birthdate && (
                  <p className="text-red-500 text-[11px]">
                    Please enter your date of birth (MM/DD/YYY)
                  </p>
                )}
              </div>

              <div className=" space-y-1 mt-3">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Gender
                </Label>

                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <Button
                className=" w-full bg-[#009FF5] rounded-full mt-10"
                // type="button"
                // disabled={!isValid}
                // onClick={handleNextStep}
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
