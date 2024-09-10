import { ScreenLayout } from "../../../components/layout/ScreenLayout";

import { Input } from "../../../components/ui/input";
import { Link } from "react-router-dom";
import signin from "../../../assets/images/signin.png";
import googleSignup from "../../../assets/images/googleSignup.png";
import AuthFooter from "../../../components/footer/AuthFooter";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";

interface Step1Props {
  nextStep: () => void;
  //   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   formData: { email: string; password: string };
}

export const Step1 = ({ nextStep }: Step1Props) => {
  return (
    <ScreenLayout>
      {" "}
      <main className="h-screen flex justify-center flex-col">
        <section className=" flex justify-between items-center  w-full">
          <section className=" w-full">
            <img src={signin} alt="" />
          </section>

          <section className=" w-[60%] border-4 p-10  border-blue-500 rounded-2xl">
            <form>
              <div className=" flex justify-center flex-col items-center">
                <h1 className="text-xl font-bold">Create an account</h1>
              </div>

              <div className=" space-y-1">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="name@gmail.com"
                  className=" placeholder:text-[#D9D9D9]"
                />
              </div>

              <div className=" space-y-1 mt-3">
                <Label htmlFor="" className=" font-semibold text-sm">
                  Password
                </Label>
                <Input
                  type="email"
                  placeholder="Password"
                  className=" placeholder:text-[#D9D9D9]"
                />
              </div>

              <Button
                className=" w-full bg-[#009FF5] rounded-full mt-4"
                type="button"
                onClick={nextStep}
              >
                Next
              </Button>

              <div className=" flex gap-3 items-center">
                <div className=" h-[1px] w-full my-7 bg-gray-300" />
                <p className=" text-sm">Or</p>
                <div className=" h-[1px] w-full my-7 bg-gray-300" />
              </div>

              <div>
                <img src={googleSignup} alt="google-signup" />
              </div>

              <div className=" h-[1px] w-full my-7 bg-gray-300" />

              <Link
                className=" text-center flex justify-center text-sm gap-1 text-gray-400"
                to={"/login"}
              >
                Already have an account?
                <span className=" font-semibold text-black">Login</span>
              </Link>
            </form>
          </section>
        </section>
        <AuthFooter />
      </main>
    </ScreenLayout>
  );
};
