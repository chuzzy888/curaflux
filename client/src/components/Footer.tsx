import ftm from "../assets/images/ftm.png";
import sc1 from "../assets/images/Social icon (1).png";
import sc2 from "../assets/images/Social icon (2).png";
import sc3 from "../assets/images/Social icon.png";
import sc4 from "../assets/images/Frame 61.png";

function Footer() {
  return (
    <footer className="bg-[#013958]">
      <div className="container mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-5">
          <div className="flex flex-col items-center md:items-start space-y-5">
            <img src={ftm} alt="CuraFlux Logo" className="h-32" />
            <p className="text-sm text-center md:text-left text-white">
              CuraFlux is dedicated to simplifying <br /> medics staffing by
              connecting healthcare professionals <br /> with hospitals in need.
              Our platform ensures seamless, secure, and <br /> efficient
              staffing solutions for the healthcare industry.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-5">
            <p className="font-bold text-sm text-white">Quick Links</p>
            <p className="text-sm text-white">Home</p>
            <p className="text-sm text-white">Staffing</p>
            <p className="text-sm text-white">Why Choose Us</p>
            <p className="text-sm text-white">FAQs</p>
            <p className="text-sm text-white">Testimonials</p>
            <p className="text-sm text-white">Contact Us</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-5">
            <p className="font-bold text-sm text-white">For Hospitals</p>
            <p className="text-sm text-white">Sign Up</p>
            <p className="text-sm text-white">Post a Shift</p>
            <p className="text-sm text-white">Hospital Profiles</p>
            <p className="text-sm text-white">Shift Management</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-5">
            <p className="font-bold text-sm text-white">For Nurses</p>
            <p className="text-sm text-white">Sign Up</p>
            <p className="text-sm text-white">Find Shifts</p>
            <p className="text-sm text-white">Create Profile</p>
            <p className="text-sm text-white">Verification Process</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-5">
            <p className="font-bold text-sm text-white">Resources</p>
            <p className="text-sm text-white">Blog</p>
            <p className="text-sm text-white">Help Center</p>
            <p className="text-sm text-white">Privacy Policy</p>
            <p className="text-sm text-white">Terms of Service</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white mt-10">
        <div className="container mx-auto px-4"></div>
      </div>

      <div className="text-center text-white py-5 flex justify-between md:flex-row flex-col items-center px-8">
        <p className="text-sm">
          Copyright © 2024 CuraFlux. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <p className="text-lg">Follow Us</p>
          <div className="flex items-center gap-3">
            <img src={sc4} alt="" className="h-10" />
            <img src={sc3} alt="" className="h-5" />
            <img src={sc1} alt="" className="h-5" />
            <img src={sc2} alt="" className="h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
