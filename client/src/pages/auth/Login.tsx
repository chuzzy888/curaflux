import React from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { Button } from "../../components/ui/button";

const Login = () => {
  return (
    <ScreenLayout>
      <main className=" flex justify-between items-center h-screen">
        <section>img</section>

        <section>
          <form>
          <h1 className="text-xl font-bold">Welcome Back! Sign In</h1>
          <button type="button">Google</button>

          <div className=" h-[0.5px] w-full my-7 bg-gray-300" />

            <div>
                <label htmlFor="" className=" font-semibold text-sm">Email or Phone number</label>

                <Button>me</Button>
            </div>
          </form>
        </section>
      </main>
    </ScreenLayout>
  );
};

export default Login;
