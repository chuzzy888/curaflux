import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const Help = () => {
  return (
    <main className="border py-8 px-6 max-w-5xl mx-auto mt-20 bg-white shadow-lg rounded-lg ">
      <section className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold text-blue-600 text-center">
            Contact Curaflux
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Fill out this form to get in touch with our locum for potential job
            opportunities.
          </p>

          <form className="mt-6 border p-4">
            <div className="mb-4">
              <Label className="text-sm" htmlFor="name">
                Your Name
              </Label>
              <Input type="text" id="name" className="mt-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div>
                <Label className="text-sm" htmlFor="email">
                  Email Address
                </Label>
                <Input type="email" id="email" className="mt-1" />
              </div>

              <div>
                <Label className="text-sm" htmlFor="number">
                  Phone Number
                </Label>
                <Input type="tel" id="number" className="mt-1" />
              </div>
            </div>

            <div className="mb-4">
              <Label className="text-sm" htmlFor="message">
                Message
              </Label>
              <Textarea id="message" className="h-[150px] resize-none mt-1" />
            </div>
            <p className="mt-1 text-xs text-gray-600">
              Include any specific requirements or questions you may have.
            </p>

            <Button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white transition duration-300">
              Submit
            </Button>
          </form>
        </div>

        <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0 hidden md:block">
          <img
            src="https://i.pinimg.com/474x/f6/32/09/f632099eb5c5211c545b4e0324cd9713.jpg"
            alt="Contact Curaflux"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </section>
    </main>
  );
};

export default Help;
