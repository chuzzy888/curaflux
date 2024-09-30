import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <nav className="flex justify-between p-5 h-screen w-5/6 mx-auto">
        <h1>logo</h1>
        <div className="flex gap-5">
          <p>sign up</p>
          <Link to={"/Locum"}>
            <p>Find shift</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
