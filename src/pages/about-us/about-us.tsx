import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { FiCheckCircle } from "react-icons/fi";
import { FaRegClock, FaUsers } from "react-icons/fa";
import { GiHospital } from "react-icons/gi";
import { LuAward } from "react-icons/lu";
import chizu from "../../assets/images/chizu.jpg";
import ike from "../../assets/images/ike.jpeg";
import ben from "../../assets/images/ben.jpeg";
import cf from "../../assets/images/cf1 1.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const values = [
  {
    text: "Excellence in Healthcare",
  },
  {
    text: "Integrity and Transparency",
  },
  {
    text: "Innovation in Staffing Solutions",
  },
  {
    text: "Commitment to Our Community",
  },
];

const choose = [
  {
    icon: <FaUsers size={35} />,
    title: "Vast Network",
    subTitle: "Access to thousands of healthcare professionals and facilities",
  },
  {
    icon: <GiHospital size={35} />,
    title: "Quality Assurance",
    subTitle:
      "Rigorous vetting process for all our locums and partner facilities",
  },
  {
    icon: <FaRegClock size={35} />,
    title: "Quick Placements",
    subTitle: "Efficient matching system for rapid staffing solutions",
  },
  {
    icon: <LuAward size={35} />,
    title: "Expert Support",
    subTitle: "Dedicated team to assist you throughout the process",
  },
];

const teams = [
  {
    image: ben,
    name: "Benjamin Chidera",
    role: "Software Engineer",
  },
  {
    image: chizu,
    name: "Chizu Praise",
    role: "Software Engineer",
  },
  {
    image: ike,
    name: "Ikechukwu Abaleke",
    role: "Product Manager",
  },
  //   {
  //     image:
  //       "https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg?height=200&width=200",
  //     name: "Mike Chen",
  //     role: "Product Manager",
  //   },
  //   {
  //     image:
  //       "https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg?height=200&width=200",
  //     name: "Lisa Patel",
  //     role: "Product Manager",
  //   },
  //   {
  //     image:
  //       "https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg?height=200&width=200",
  //     name: "Lee Sarah",
  //     role: "Product Manager",
  //   },
  //   {
  //     image:
  //       "https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg?height=200&width=200",
  //     name: "Sarah Joe",
  //     role: "Product Manager",
  //   },
];

const AboutUs = () => {
  return (
    <main className="pb-12">
      <ScreenLayout>
        {/* <div className=" text-center p-4">
          <h1 className=" font-bold text-3xl">
            About <span className="text-blue-500">Curaflux</span>
          </h1>
          <p className=" text-sm text-gray-600 p-2">
            Connecting Healthcare Professionals with Opportunities
          </p>
        </div> */}
        <div className="text-center py-8 px-4 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="font-extrabold text-2xl md:text-4xl mb-2 text-gray-800">
            About <span className="text-blue-600">Curaflux</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg px-4 leading-relaxed">
            Connecting Healthcare Professionals with Opportunities
          </p>
        </div>

        <div className="my-7 flex flex-col md:flex-row items-center w-full gap-10">
          {/* Image section */}
          <img
            src={cf}
            alt="Curaflux Mission"
            className="h-[300px] md:h-[400px] w-full md:w-1/2 object-cover rounded-lg "
          />

          {/* Text section */}
          <div className="text-center md:text-left px-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-blue-600">
              Our Mission
            </h1>
            <h2 className="text-gray-700 text-sm md:text-base leading-relaxed">
              Curaflux is dedicated to connecting healthcare professionals with
              temporary staffing opportunities in facilities that need their
              expertise. Our mission is to simplify staffing processes, ensuring
              both professionals and facilities can focus on what matters most —
              delivering quality healthcare.
            </h2>

            <br />

            <h4 className="text-gray-600 text-sm md:text-base">
              We aim to build an efficient, transparent, and user-friendly
              platform that empowers healthcare workers and facilities to
              collaborate seamlessly, enhancing patient care outcomes.
            </h4>
          </div>
        </div>

        <section className="py-8 px-4 bg-gray-50">
          <div className="text-center mb-8">
            <p className="text-2xl font-extrabold text-blue-600">
              Our Mission & Values
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-xl font-bold text-blue-600">Our Mission</p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                To revolutionize healthcare staffing by providing seamless
                connections between skilled professionals and healthcare
                facilities, ensuring quality care for patients everywhere.
              </p>
            </div>

            <div className="border bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-xl font-bold text-blue-600">Our Values</p>
              <div className="mt-4 space-y-2">
                {values.map((value, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <FiCheckCircle color="green" size={20} />
                    <p className="text-gray-700 text-sm">{value.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* <section className=" py-8">
          <h2 className=" text-xl font-bold">Why Choose Curaflux?</h2>

          <div className=" mt-4 grid grid-cols-2 md:grid-cols-4 gap-5">
            {choose.map((values, i) => (
              <div key={i} className=" border p-4 rounded-md">
                {values.icon}
                <p className="py-1 text-lg font-semibold">{values.title}</p>
                <p className=" text-sm text-gray-600">{values.subTitle}</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="py-8 bg-gray-50">
          <h2 className="text-2xl font-extrabold text-center text-blue-600">
            Why Choose Curaflux?
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {choose.map((value, i) => (
              <div
                key={i}
                className="border border-gray-200 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center items-center mb-4">
                  {value.icon}
                </div>
                <p className="py-2 text-lg font-semibold text-blue-700 text-center">
                  {value.title}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  {value.subTitle}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* <section>
          <p className=" text-xl font-bold">Meet Our Team</p>

          <div className="mt-5 grid grid-cols-3 gap-5">
            {teams.map(team => (
              <div className=" text-center border p-5 rounded-md">
                <img
                  src={team.image}
                  alt={team.name}
                  className=" w-28 h-28 rounded-full mx-auto object-cover"
                />

                <p className=" mt-2 text-center font-bold">{team.name}</p>
                <p className=" text-sm text-gray-600">{team.role}</p>
              </div>
            ))}
          </div>
        </section> */}

        <section className="py-8 bg-gray-50">
          <h2 className="text-2xl font-extrabold text-center text-blue-600">
            Meet Our Team
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <div
                key={index}
                className="border border-gray-200 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover mb-4 border-4 border-blue-500"
                />
                <h3 className="mt-2 text-lg font-semibold">{team.name}</h3>
                <p className="text-sm text-gray-600">{team.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* <section className="mt-14">
          <p className=" text-xl font-bold">Frequently Asked Questions</p>

          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does Curaflux work?</AccordionTrigger>
                <AccordionContent>
                  Curaflux connects healthcare professionals with facilities in
                  need of temporary staffing. We handle the matching process,
                  credentialing, and placement to ensure a smooth experience for
                  both parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Who can use Curaflux? </AccordionTrigger>
                <AccordionContent>
                  We work with a wide range of healthcare professionals,
                  including doctors, nurses, nurse practitioners, physician
                  assistants, and specialists across various fields.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How long does the placement process take?
                </AccordionTrigger>
                <AccordionContent>
                  The placement process can vary depending on the specific
                  requirements, but we strive to make matches as quickly as
                  possible. Many placements can be completed within a few days
                  to a week.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Is Curaflux available nationwide?
                </AccordionTrigger>
                <AccordionContent>
                  Not yet, Curaflux operates within Nigeria, connecting
                  healthcare professionals with opportunities across all 36
                  states hope to expand to other african countries .
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section> */}

        <section className="mt-14 px-4">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            Frequently Asked Questions
          </h2>

          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <div className="space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-blue-100 text-blue-700 rounded-md p-4 transition duration-300 hover:bg-blue-200">
                    How does Curaflux work?
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 p-4 rounded-md">
                    Curaflux connects healthcare professionals with facilities
                    in need of temporary staffing. We handle the matching
                    process, credentialing, and placement to ensure a smooth
                    experience for both parties.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="bg-blue-100 text-blue-700 rounded-md p-4 transition duration-300 hover:bg-blue-200">
                    Who can use Curaflux?
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 p-4 rounded-md">
                    We work with a wide range of healthcare professionals,
                    including doctors, nurses, nurse practitioners, physician
                    assistants, and specialists across various fields.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="bg-blue-100 text-blue-700 rounded-md p-4 transition duration-300 hover:bg-blue-200">
                    How long does the placement process take?
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 p-4 rounded-md">
                    The placement process can vary depending on the specific
                    requirements, but we strive to make matches as quickly as
                    possible. Many placements can be completed within a few days
                    to a week.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="bg-blue-100 text-blue-700 rounded-md p-4 transition duration-300 hover:bg-blue-200">
                    Is Curaflux available nationwide?
                  </AccordionTrigger>
                  <AccordionContent className="bg-gray-50 p-4 rounded-md">
                    Not yet, Curaflux operates within Nigeria, connecting
                    healthcare professionals with opportunities across all 36
                    states. We hope to expand to other African countries.
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
          </div>
        </section>

        <section className="mt-14 text-center px-4">
          <h2 className="font-bold text-2xl text-blue-600">
            Ready to Join Curaflux?
          </h2>
          <p className="text-gray-700 mt-2">
            Start your journey with us today and discover the perfect healthcare
            opportunity.
          </p>

          <div className="flex items-center md:flex-row flex-col gap-5 mt-5 justify-center">
            <Link to={"/register"}>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 px-6 py-3 rounded-md">
                Get Started
              </Button>
            </Link>
            {/* 
    <Link to={"/register/healthcare"}>
      <Button className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 px-6 py-3 rounded-md">
        Sign Up as a Healthcare Service
      </Button>
    </Link> */}
          </div>
        </section>
      </ScreenLayout>
    </main>
  );
};

export default AboutUs;
