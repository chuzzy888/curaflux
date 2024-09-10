import React from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import signupImg from "../../assets/images/signUp.png";
import google from "../../assets/images/Google.png";
import AuthFooter from "../../components/footer/AuthFooter";

const Login = () => {
  return (
    <ScreenLayout>
      <main className="h-screen flex justify-center flex-col">
        <section className=" flex justify-between items-center  w-full">
          <section className=" w-full">
            <img src={signupImg} alt="" />
          </section>

          <section className=" w-[60%] border py-10 px-20 border-black rounded-2xl">
            <form>
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

              <div className=" mt-3 flex justify-between items-center">
                <div className=" flex items-center gap-1">
                  <label
                    htmlFor="AcceptConditions"
                    className="relative inline-block h-6 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-sky-500"
                  >
                    <input
                      type="checkbox"
                      id="AcceptConditions"
                      className="peer sr-only"
                    />

                    <span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-white transition-all peer-checked:start-8"></span>
                  </label>
                  <Label className=" text-xs">Remember me</Label>
                </div>
                <Link
                  className=" font-semibold text-sm"
                  to={"/forgot-password"}
                >
                  Forgot Passowrd?
                </Link>
              </div>

              <Button className=" w-full bg-[#009FF5] rounded-full mt-7">
                Login
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
