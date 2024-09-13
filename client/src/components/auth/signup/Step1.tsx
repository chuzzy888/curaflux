import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import { Input } from "../../../components/ui/input";
import { Link } from "react-router-dom";
import signin from "../../../assets/images/signin.png";
import googleSignup from "../../../assets/images/googleSignup.png";
import AuthFooter from "../../../components/footer/AuthFooter";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { InputTypes } from "../../../types/types";

interface Step1Props {
  nextStep: () => void;
  register: UseFormRegister<InputTypes>;
  errors: FieldErrors<InputTypes>;
  isValid: boolean;
}

export const Step1 = ({ nextStep, register, errors, isValid }: Step1Props) => {
  return (
    <ScreenLayout>
      <main className="h-screen flex justify-center flex-col">
        <section className="flex justify-center items-center gap-40">
          <section className="w-[502px] h-[502px]">
            <img src={signin} alt="" className="w-full" />
          </section>

          <section className=" w-[521px] h-[570px] border-4 p-10 border-blue-500 rounded-2xl">
            <div className="flex justify-center flex-col items-center">
              <h1 className="text-xl font-bold">Create an account</h1>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="font-semibold text-sm">
                Email
              </Label>
              <Input
                type="email"
                placeholder="name@gmail.com"
                className="placeholder:text-[#D9D9D9]"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-[11px]">
                  Please enter your email address
                </p>
              )}
            </div>

            <div className="space-y-1 mt-3">
              <Label htmlFor="password" className="font-semibold text-sm">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                className="placeholder:text-[#D9D9D9]"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              className="w-full bg-[#009FF5] rounded-full mt-4"
              type="button"
              disabled={!isValid}
              onClick={nextStep}
            >
              Next
            </Button>

            <div className="flex gap-3 items-center">
              <div className="h-[1px] w-full my-7 bg-gray-300" />
              <p className="text-sm">Or</p>
              <div className="h-[1px] w-full my-7 bg-gray-300" />
            </div>

            <div>
              <img src={googleSignup} alt="google-signup" />
            </div>

            <div className="h-[1px] w-full my-7 bg-gray-300" />

            <Link
              className="text-center flex justify-center text-sm gap-1 text-gray-400 no-underline"
              to={"/login"}
            >
              Already have an account?
              <span className="font-semibold text-black">Login</span>
            </Link>
          </section>
        </section>
        <AuthFooter />
      </main>
    </ScreenLayout>
  );
};
