import React, { useState } from "react";
import signin from "../../../assets/images/signin.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import axios, { AxiosError } from "axios";
// import AuthFooter from "../../components/footer/AuthFooter";
import Cookies from "js-cookie";
import { Modal } from "../../../components/modals/Success-Modal";
import { useNavigate } from "react-router-dom";

interface FormData {
  hospitalName: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  hospitalType: string;
  LicenseNumber: string;
}

const HospitalRegister: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (form) => {
    console.log(form);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hospital/register`,
        { ...form, role: "healthcare" }
      );

      if (data.success === true) {
        setModalMessage("You have successfully been registered");
        setIsModalOpen(true);

        setTimeout(() => {
          navigate("/register/getVerified");
        }, 2000);
      }

      Cookies.set("healthcareToken", data.healthcareToken);
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;

      setModalMessage(
        axiosError?.response?.data?.message ||
          "An error occurred during registration."
      );
      setIsModalOpen(true);
    }
  };

  return (
    <ScreenLayout>
      <Modal
        msg={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <main className=" min-h-screen p-4 flex   items-center justify-center">
        <div className="flex   items-center justify-center">
          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white p-8 border rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Register Your Hospital</h1>
            <p className="text-gray-600 mb-6">
              Fill out the form below to create an account for your hospital.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row md:space-x-4">
                {/* Hospital Name */}
                <div className="w-full">
                  <label htmlFor="">Hospital Name</label>
                  <input
                    type="text"
                    placeholder="Medix Care Hospital"
                    className={`w-full p-2 border ${
                      errors.hospitalName ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    {...register("hospitalName", {
                      required: "Hospital Name is required",
                    })}
                  />
                  {/* Display error message */}
                  {errors.hospitalName && (
                    <p className="text-red-500 text-sm">
                      {errors.hospitalName.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="w-full mt-4 md:mt-0">
                  <label htmlFor="">Password</label>

                  <input
                    type="password"
                    placeholder="A126****"
                    className={`w-full p-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                {/* Email */}
                <div className="w-full">
                  <label htmlFor="">Email Address*</label>

                  <input
                    type="email"
                    placeholder="Medixcare@curaflux.com"
                    className={`w-full p-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="w-full mt-4 md:mt-0">
                  <label htmlFor="">Phone Number*</label>

                  <input
                    type="tel"
                    placeholder="+123-3652-68785"
                    className={`w-full p-2 border ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="w-full">
                <textarea
                  placeholder="Enter hospital address"
                  className={`w-full p-2 border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                  rows={3}
                  {...register("address", { required: "Address is required" })}
                ></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                {/* Hospital Type */}
                <div className="w-full">
                  <select
                    className={`w-full p-2 border ${
                      errors.hospitalType ? "border-red-500" : "border-gray-300"
                    } rounded-md`}
                    {...register("hospitalType", {
                      required: "Hospital Type is required",
                    })}
                  >
                    <option value="">Select hospital type</option>
                    <option value="General">General</option>
                    <option value="Specialized">Specialized</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Clinic">Private</option>
                  </select>
                  {errors.hospitalType && (
                    <p className="text-red-500 text-sm">
                      {errors.hospitalType.message}
                    </p>
                  )}
                </div>

                {/* License Number */}
                <div className="w-full mt-4 md:mt-0">
                  <input
                    type="text"
                    placeholder="Enter license number"
                    className={`w-full p-2 border ${
                      errors.LicenseNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                    {...register("LicenseNumber", {
                      required: "License Number is required",
                    })}
                  />
                  {errors.LicenseNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.LicenseNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition ${
                  isSubmitting && "cursor-not-allowed"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering" : "Register"}
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 md:flex items-center justify-center p-8  rounded-md hidden">
            <img
              src={signin}
              alt="Hospital Registration"
              className="max-w-full h-auto rounded-lg "
            />
          </div>
        </div>
        {/* <AuthFooter /> */}
      </main>
    </ScreenLayout>
  );
};

export default HospitalRegister;
