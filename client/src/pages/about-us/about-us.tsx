import React from "react";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { FiCheckCircle } from "react-icons/fi";
import { FaRegClock, FaUsers } from "react-icons/fa";
import { GiHospital } from "react-icons/gi";
import { LuAward } from "react-icons/lu";

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
    image:
      "https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg?height=200&width=200",
    name: "Benjamin Chidera",
    role: "Software Engineer",
  },
  {
    image:
      "https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg?height=200&width=200",
    name: "Chizu Praise",
    role: "Software Engineer",
  },
  {
    image:
      "https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg?height=200&width=200",
    name: "Sarah Lee",
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
        <div className=" text-center">
          <h1 className=" font-bold text-xl">About Curaflux</h1>
          <p className=" text-sm text-gray-600">
            Connecting Healthcare Professionals with Opportunities
          </p>
        </div>

        <div className=" my-7">
          <img
            src="https://g-1rvcqrcptp9.vusercontent.net/placeholder.svg"
            alt=""
            className="h-[500px] w-full object-cover"
          />
        </div>

        <section>
          <div>
            <p className=" text-xl font-bold">Our Mission & Values</p>
          </div>

          <div className="grid grid-cols-2 mt-5 gap-6">
            <div className=" border mt-4 p-3 rounded-md">
              <p className=" text-lg font-bold">Our Mission</p>

              <p className=" mt-2 text-sm text-gray-700">
                To revolutionize healthcare staffing by providing seamless
                connections between skilled professionals and healthcare
                facilities, ensuring quality care for patients everywhere.
              </p>
            </div>

            <div className=" border mt-4 p-3 rounded-md">
              <div>
                <p className=" text-xl font-bold">Our Values</p>
              </div>

              <div>
                {values.map((values, i) => (
                  <div key={i}>
                    <p className=" flex items-center gap-2 mt-1 text-sm">
                      <FiCheckCircle color="green" /> {values.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className=" py-8">
          <h2 className=" text-xl font-bold">Why Choose Curaflux?</h2>

          <div className=" mt-4 grid grid-cols-4 gap-5">
            {choose.map((values, i) => (
              <div key={i} className=" border p-4 rounded-md">
                {values.icon}
                <p className="py-1 text-lg font-semibold">{values.title}</p>
                <p className=" text-sm text-gray-600">{values.subTitle}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className=" text-xl font-bold">Meet Our Team</p>

          <div className="mt-5 grid grid-cols-3 gap-5">
            {teams.map((team) => (
              <div className=" text-center border p-5 rounded-md">
                <img
                  src={team.image}
                  alt={team.name}
                  className=" w-28 rounded-full mx-auto"
                />

                <p className=" mt-2 text-center font-bold">{team.name}</p>
                <p className=" text-sm text-gray-600">{team.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <p className=" text-xl font-bold">Frequently Asked Questions</p>

          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How does LocumLink work?</AccordionTrigger>
                <AccordionContent>
                  LocumLink connects healthcare professionals with facilities in
                  need of temporary staffing. We handle the matching process,
                  credentialing, and placement to ensure a smooth experience for
                  both parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What types of healthcare professionals can use LocumLink?
                </AccordionTrigger>
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
                  Is LocumLink available nationwide?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, LocumLink operates across the United States, connecting
                  healthcare professionals with opportunities in various states
                  and regions.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="mt-14 text-center">
          <p className="font-bold text-xl">Ready to Join Curaflux?</p>
          <p className=" text-gray-700">
            Start your journey with us today and discover the perfect healthcare
            opportunity.
          </p>

          <div className="flex items-center gap-5 mt-5 justify-center">
            <Link to={"/register"}>
              <Button className=" bg-blue-400">
                Sign Up as a Professional
              </Button>
            </Link>

            <Link to={"/register/healthcare"}>
              <Button className=" bg-blue-400">
                Sign Up as a Healthcare Service
              </Button>
            </Link>
          </div>
        </section>
      </ScreenLayout>
    </main>
  );
};

export default AboutUs;
