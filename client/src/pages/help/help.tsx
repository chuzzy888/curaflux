import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const Help = () => {
  return (
    <main className=" border py-3 px-5 max-w-2xl mx-auto mt-20">
      <section>
        <h1 className="text-lg font-bold">Contact Curaflux</h1>
        <p className=" text-xs text-gray-600">
          Fill out this form to get in touch with our locum for potential job
          opportunities.
        </p>

        <form className=" mt-7">
          <div>
            <Label className=" text-xs" htmlFor="name">
              Your Name
            </Label>
            <Input type="text" id="name" />
          </div>

          <div className=" grid grid-cols-2 my-3 gap-5">
            <div>
              <Label className=" text-xs" htmlFor="email">
                Email Address
              </Label>
              <Input type="email" id="email" />
            </div>

            <div>
              <Label className=" text-xs" htmlFor="number">
                Phone Number
              </Label>
              <Input type="tel" id="number" />
            </div>
          </div>

          <div>
            <Label className=" text-xs" htmlFor="message">
              Message
            </Label>
            <Textarea id="message" className=" h-[150px] resize-none" />
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Include any specific requirements or questions you may have.
          </p>

          <Button className=" w-full mt-8 bg-blue-400">Submit</Button>
        </form>
      </section>
    </main>
  );
};

export default Help;
