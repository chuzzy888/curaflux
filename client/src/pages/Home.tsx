import React from "react";
import heroImg from "../assets/images/heroImg (1).png";
import f1 from "../assets/images/f1.png";
import f2 from "../assets/images/f2.png";
import f3 from "../assets/images/f3.png";
import f4 from "../assets/images/f4.png";
import hl1 from "../assets/images/hl1.png";
import hl2 from "../assets/images/df.png";
import hl3 from "../assets/images/hl3.png";
import hl4 from "../assets/images/hl4.png";
import hl5 from "../assets/images/hl5.png";
import hl6 from "../assets/images/hl6.png";
import blc from "../assets/images/blc.jpeg";
import icn1 from "../assets/images/icn1.png";
import icn2 from "../assets/images/icn2.png";
import icn3 from "../assets/images/icn3.png";
import icn4 from "../assets/images/icn4.png";
import dr from "../assets/images/dr.png";
import det from "../assets/images/det.png";
import icn5 from "../assets/images/icn5.png";
import whc from "../assets/images/gp (2).png";
import hiw from "../assets/images/hiw.png";
import { FiArrowDownRight } from "react-icons/fi";
import { ScreenLayout } from "../components/layout/ScreenLayout";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <ScreenLayout>
      <div className="">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 animate__animated animate__fadeIn ">
            <h1 className="text-3xl sm:text-6xl font-bold mb-4 leading-tight">
              Connecting <span className="text-blue-600">Medics</span> <br />
              with <span className="text-blue-600">Hospitals</span> <br />
              in Real-Time
            </h1>
            <p className="mb-6 text-base sm:text-lg text-gray-700">
              Join our community and start finding shifts that match your
              expertise.
            </p>

            <Link to={"/register"}>
              {" "}
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center">
                Get started <FiArrowDownRight className="font-bold text-2xl" />
              </button>
            </Link>
            <div className="mt-6 flex flex-col sm:flex-row items-center border border-blue-300 rounded-full sm:w-1/2 w-full p-4">
              <div className="mr-0 sm:mr-6 mb-4 sm:mb-0">
                <div className="flex -space-x-4">
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    src={f1}
                    alt="User 1"
                  />
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    src={f2}
                    alt="User 2"
                  />
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    src={f3}
                    alt="User 3"
                  />
                  <img
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                    src={f4}
                    alt="User 4"
                  />
                </div>
              </div>
              <div className="text-center sm:text-left whitespace-nowrap">
                <p className="text-gray-600 font-medium text-sm sm:text-sm">
                  8K+ Happy Users
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2  mt-10 lg:mt-0 animate__animated animate__fadeIn">
            <img src={heroImg} alt="Doctor" className="rounded-lg " />
          </div>
        </div>

        <div className="container mx-auto mt-16 flex justify-center bg-blue-100 p-5 mb-16 rounded">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex  md:flex-row flex-col items-center gap-1">
              <img
                src={hl1}
                alt="Kinsmith Specialist Hospital"
                className="h-8 sm:h-10"
              />
              <p className="text-[10px] sm:text-xs text-center sm:text-left">
                Kinsmith Specialist Hospital
              </p>
            </div>
            <div className="flex  md:flex-row flex-col items-center gap-1">
              <img
                src={hl2}
                alt="Cornerstone Healthcare"
                className="h-8 sm:h-10"
              />
              <p className="text-[10px] sm:text-xs text-center sm:text-left">
                Cornerstone Healthcare
              </p>
            </div>
            <div className="flex  md:flex-row flex-col items-center gap-1">
              <img src={hl3} alt="Mayo Clinic" className="h-8 sm:h-10" />
              <p className="text-[10px] sm:text-xs text-center sm:text-left">
                Mayo Clinic
              </p>
            </div>
            <div className="flex  md:flex-row flex-col items-center gap-1">
              <img
                src={hl4}
                alt="Babcock University Hospital"
                className="h-8 sm:h-10"
              />
              <p className="text-[10px] sm:text-xs text-center sm:text-left">
                Babcock Hospital
              </p>
            </div>
            <div className="flex  md:flex-row flex-col items-center gap-1">
              <img src={hl5} alt="Shouldice Hospital" className="h-8 sm:h-10" />
              <p className="text-[10px] sm:text-xs text-center sm:text-left">
                Shouldice Hospital
              </p>
            </div>
            <div className="flex md:flex-row flex-col items-center gap-1">
              <img src={hl6} alt="Seventh-d Hospital" className="h-8 sm:h-10" />
              <p className="text-[10px] sm:text-xs text-center sm:text-left">
                Ever Care Hospital
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="md:text-3xl text-xl font-bold text-center mb-10 ft">
              Streamlined Staffing Solutions for Hospitals
            </h2>

            <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
              <div className="lg:w-1/3 mb-10 lg:mb-0">
                <img
                  src={blc}
                  alt="Nurse working"
                  className="rounded-lg shadow-lg h-1/2 md:h-full "
                />
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-100 rounded-lg shadow-lg p-6 text-center">
                  <img src={icn5} alt="" />
                  <h3 className="text-xl font-semibold mb-2">
                    REAL-TIME SHIFTS REQUEST
                  </h3>
                  <p className="text-gray-700">
                    Post shift requests instantly and find the right nurses in
                    real-time.
                  </p>
                </div>

                <div className="bg-red-100 rounded-lg shadow-lg p-6 text-center">
                  <img src={icn4} alt="" />{" "}
                  <h3 className="text-xl font-semibold mb-2">
                    GEO-LOCATION MATCHING
                  </h3>
                  <p className="text-gray-700">
                    Match medics with your hospital based on proximity and
                    availability.
                  </p>
                </div>

                <div className="bg-yellow-100 rounded-lg shadow-lg p-6 text-center">
                  <img src={icn2} alt="" />
                  <h3 className="text-xl font-semibold mb-2">
                    SECURE VERIFICATION
                  </h3>
                  <p className="text-gray-700">
                    Facial recognition ensures only qualified and verified
                    nurses fill your shifts.
                  </p>
                </div>

                <div className="bg-purple-100 rounded-lg shadow-lg p-6 text-center">
                  <img src={icn1} alt="" />
                  <h3 className="text-xl font-semibold mb-2">
                    IN-APP COMMUNICATION
                  </h3>
                  <p className="text-gray-700">
                    Communicate directly with nurses through our secure
                    messaging system.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <img src={icn3} alt="" />{" "}
                  <h3 className="text-xl font-semibold mb-2">
                    ADVANCED ANALYTICS
                  </h3>
                  <p className="text-gray-700">
                    Access detailed reports on staffing trends, shift
                    fulfillment rates, and cost analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center p-6 bg-gray-50  my-3 ">
          <div className="md:w-1/2">
            <h2 className="md:text-3xl text-xl font-bold text-primary ml-4 ">
              Why Choose CuraFlux?
            </h2>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black font-medium">
                    Instant Shift Matching
                  </strong>{" "}
                  Get notified about available shifts that match your expertise
                  and availability.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black font-medium">
                    Flexible Scheduling{" "}
                  </strong>{" "}
                  Take control of your work-life balance by selecting shifts
                  that fit your schedule.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black font-medium">
                    Seamless Integration with Hospitals
                  </strong>{" "}
                  Hospitals can request practitioners easily, ensuring quick
                  responses for urgent staffing needs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black font-medium">
                    Simple & Fast Sign-Up
                  </strong>{" "}
                  Sign up in minutes, and start receiving shift requests
                  directly on your phone.
                </span>
              </li>
            </ul>

            <p className="ml-4 mt-5">Download the CuraFlux app now!</p>
            <div className="flex items-center gap-4 ml-4 ">
              <img src={dr} alt="" className="w-28" />
              <img src={det} alt="" className="w-36" />
            </div>
          </div>
          <div className="md:w-1/2 p-10 mt-6 md:mt-0">
            <img
              alt="CuraFlux representative"
              src={whc}
              className="object-cover lg:pl-16 "
            />
          </div>
        </div>
        <div>
          <img src={hiw} alt="" className="md:block hidden w-full" />
        </div>
      </div>
      <Footer />
    </ScreenLayout>
  );
};

export default Home;
