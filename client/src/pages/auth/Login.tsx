import React from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";

const Login = () => {
  return (
    <ScreenLayout>
      <main className=" flex justify-between items-center h-screen">
        <section>img</section>

        <section>
          <h1 className="text-xl font-bold">Welcome Back! Sign In</h1>
          <button>Google</button>

          <div className=" h-[0.5px] w-full my-7 bg-gray-300" />
        </section>
      </main>
    </ScreenLayout>
  );
};

export default Login;
