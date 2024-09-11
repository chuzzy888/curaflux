import React from "react";
import heroImg from "../assets/images/heroImg (1).png";
import f1 from "../assets/images/f1.png";
import f2 from "../assets/images/f2.png";
import f3 from "../assets/images/f3.png";
import f4 from "../assets/images/f4.png";
import hl1 from "../assets/images/hl1.png";
import hl2 from "../assets/images/hl2.png";
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
// import { FaAngleDoubleDown } from "react-icons/fa";
import { ScreenLayout } from "../components/layout/ScreenLayout";
// import { Accordion, Placeholder } from "rsuite";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <ScreenLayout>
      <div className=" ">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2">
            <h1 className="text-6xl font-bold mb-4 leading-[1.25] fs ">
              Connecting <span className="text-blue-600">Medics</span>
              <br />
              with <span className="text-blue-600">Hospitals</span> in <br />{" "}
              Real-Time
            </h1>
            <p className="mb-6 text-lg text-gray-700">
              Join our community and start finding shifts that match your
              expertise.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center">
              Get started <FiArrowDownRight className="font-bold text-2xl" />
            </button>
            <div className="mt-6 flex items-center border border-blue-300 rounded-full w-1/2 ">
              <div className="mr-6">
                <div className="flex -space-x-4">
                  <img
                    className="w-12 h-12 rounded-full border-2 border-white"
                    src={f1}
                    alt="User 1"
                  />
                  <img
                    className="w-12 h-12 rounded-full border-2 border-white"
                    src={f2}
                    alt="User 2"
                  />
                  <img
                    className="w-12 h-12 rounded-full border-2 border-white"
                    src={f3}
                    alt="User 3"
                  />
                  <img
                    className="w-12 h-12 rounded-full border-2 border-white"
                    src={f4}
                    alt="User 3"
                  />
                </div>
              </div>
              <div>
                <p className="text-gray-600 font-medium">8K+ Happy Users</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2  mt-10 lg:mt-0">
            <img src={heroImg} alt="Doctor" className="rounded-lg " />
          </div>
        </div>

        <div className="container mx-auto mt-16 flex justify-center bg-blue-100 p-5 mb-16 rounded">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center gap-1">
              <img
                src={hl1} // Replace with actual logo
                alt="Kinsmith Specialist Hospital"
                className="h-10"
              />
              <p className="text-xs">Kinsmith Specialist Hospital</p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={hl2} // Replace with actual logo
                alt="Cornerstone Healthcare"
                className="h-10"
              />
              <p className="text-xs">Cornerstone Healthcare</p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={hl3} // Replace with actual logo
                alt="Mayo Clinic"
                className="h-10"
              />
              <p className="text-xs">Mayo Clinic</p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={hl4} // Replace with actual logo
                alt="Babcock University Hospital"
                className="h-10"
              />
              <p className="text-xs">
                Babcock University Teaching Hospital BUTH
              </p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={hl5} // Replace with actual logo
                alt="Shouldice Hospital"
                className="h-10"
              />
              <p className="text-xs">Shouldice Hospital</p>
            </div>
            <div className="flex items-center gap-1">
              <img
                src={hl6} // Replace with actual logo
                alt="Seventh-d Hospital"
                className="h-10"
              />
              <p className="text-xs">Seventh-day Adventist Hospital, Ile-Ife</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center mb-10 ft">
              Streamlined Staffing Solutions for Hospitals
            </h2>

            <div className="flex flex-col lg:flex-row items-center lg:space-x-10">
              {/* Image */}
              <div className="lg:w-1/3 mb-10 lg:mb-0">
                <img
                  src={blc}
                  alt="Nurse working"
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Features grid */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
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

                {/* Feature 2 */}
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

                {/* Feature 3 */}
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

                {/* Feature 4 */}
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

                {/* Feature 5 */}
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
            <h2 className="text-2xl font-bold text-primary ml-4 ">
              Why Choose CuraFlux?
            </h2>
            <ul className="mt-4 space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black">
                    Instant Shift Matching :
                  </strong>{" "}
                  Get notified about available shifts that match your expertise
                  and availability.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black">Flexible Scheduling :</strong>{" "}
                  Take control of your work-life balance by selecting shifts
                  that fit your schedule.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black">
                    Seamless Integration with Hospitals :
                  </strong>{" "}
                  Hospitals can request practitioners easily, ensuring quick
                  responses for urgent staffing needs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-accent">•</span>
                <span>
                  <strong className="text-black">
                    Simple & Fast Sign-Up :
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
        {/* <p className="font-black text-3xl">Frequently Asked Questions</p>
        <p className="mb-4 text-sm">
          Connecting Hospitals and Nurses in a Few Simple Steps
        </p>
        <Accordion defaultActiveKey={1} bordered>
          <Accordion.Panel
            header="How do I sign up and create a profile?"
            eventKey={1}
            caretAs={FaAngleDoubleDown}
          >
            <p>
              Hospitals and medics can sign up by providing their details and
              creating a profile. Medics can include their qualifications,
              preferences, and availability, while hospitals can outline their
              staffing needs and shift requirements.
            </p>
          </Accordion.Panel>
          <Accordion.Panel
            header="How do hospitals post and medics discover shifts?"
            eventKey={2}
            caretAs={FaAngleDoubleDown}
          >
            <Placeholder.Paragraph />
          </Accordion.Panel>
          <Accordion.Panel
            header="How does CuraFlux match medics to shifts and verify credentials?"
            eventKey={3}
            caretAs={FaAngleDoubleDown}
          >
            <Placeholder.Paragraph />
          </Accordion.Panel>
          <Accordion.Panel
            header="How do hospitals and medics communicate and coordinate?"
            eventKey={3}
            caretAs={FaAngleDoubleDown}
          >
            <Placeholder.Paragraph />
          </Accordion.Panel>
          <Accordion.Panel
            header="How do medics work and get compensated?"
            eventKey={3}
            caretAs={FaAngleDoubleDown}
          >
            <Placeholder.Paragraph />
          </Accordion.Panel>
        </Accordion> */}
        <div>
          <img src={hiw} alt="" />
        </div>
      </div>
      <Footer />
    </ScreenLayout>
  );
};

export default Home;
