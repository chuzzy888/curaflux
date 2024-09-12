import React, { useState, useRef } from "react";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { verifyUser } from "../redux/feature/authSlice";

interface VerificationTypes {
  fullName: string;
  email: string;
  phoneNumber: string;
  birthdate: string;
  gender: string;
  linkedInUrl: string;
  identificationType: string;
  identificationNumber: string;
}

interface CustomJwtPayload extends JwtPayload {
  fullName: string;
  email: string;
  id: string;
}

function Verification() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VerificationTypes>();

  const token = Cookies.get("token");
  const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleUploadVerification: SubmitHandler<VerificationTypes> = async (
    form
  ) => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (uploadedFile) formData.append("identificationDocument", uploadedFile);

      if (decode?.id) {
        dispatch(verifyUser({ formData, id: decode.id }));
      }
    } catch (error) {
      console.error("Error uploading verification:", error);
    }
  };

  return (
    <main>
      <section className="p-3">
        <form
          className="max-w-2xl mx-auto p-6 rounded-lg shadow-2xl border border-t-blue-500"
          onSubmit={handleSubmit(handleUploadVerification)}
        >
          <h1 className="text-2xl font-bold mb-4">Welcome 👋</h1>
          <p className="text-muted-foreground mb-6">
            Let us know more about yourself
          </p>

          <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Full name:
              </label>
              <Input
                type="text"
                className="mt-1 block w-full p-2 border bg-gray-100 border-border rounded-md"
                placeholder="Ikechukwu Abaleke"
                defaultValue={decode?.fullName}
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Email Address:
                </label>
                <Input
                  type="email"
                  className="mt-1 block w-full p-2 border bg-gray-100 border-border rounded-md"
                  placeholder="ikechukwuabaleke29@gmail.com"
                  defaultValue={decode?.email}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Phone Number:
                </label>
                <Input
                  type="tel"
                  className="mt-1 block w-full p-2 border bg-gray-100 border-border rounded-md"
                  placeholder="+234 8147246757"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Date of Birth:
                </label>
                <Input
                  type="date"
                  className="mt-1 block w-full p-2 border bg-gray-100 border-border rounded-md"
                  {...register("birthdate", {
                    required: "Date of birth is required",
                  })}
                />
                {errors.birthdate && (
                  <p className="text-red-500 text-xs">
                    {errors.birthdate.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground">
                  Gender:
                </label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-red-500 text-xs">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            Identification and Verification
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                LinkedIn Profile:
              </label>
              <Input
                type="text"
                className="mt-1 block w-full p-2 border border-border rounded-md"
                placeholder="https://linkedin.com/in/profile"
                {...register("linkedInUrl", {
                  required: "LinkedIn URL is required",
                  // pattern: {
                  //   value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w\-]+\/?$/,
                  //   message: "Invalid LinkedIn URL",
                  // },
                })}
              />
              {errors.linkedInUrl && (
                <p className="text-red-500 text-xs">Enter your LinkedIn Url</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Identification Type:
              </label>
              <Controller
                name="identificationType"
                control={control}
                rules={{ required: "Identification type is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select identification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="drivers_license">
                        Driver's License
                      </SelectItem>
                      <SelectItem value="national_id">National ID</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.identificationType && (
                <p className="text-red-500 text-xs">
                  {errors.identificationType.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Identification Number:
              </label>
              <Input
                type="text"
                className="mt-1 block w-full p-2 border border-border rounded-md"
                placeholder="123A-456L-789B"
                {...register("identificationNumber", {
                  required: "Identification number is required",
                })}
              />
              {errors.identificationNumber && (
                <p className="text-red-500 text-xs">
                  {errors.identificationNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Upload Identification Documents:
              </label>
              <div
                className={`mt-1 border border-dashed ${
                  dragging ? "border-blue-500" : "border-border"
                } rounded-md p-4 bg-gray-50 text-center cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                {uploadedFile ? (
                  <p className="text-foreground">
                    {uploadedFile.name} uploaded successfully
                  </p>
                ) : (
                  <>
                    <p className="text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, JPEG, or PDF (max 5MB)
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground mb-4 mt-6">
              Consent and Privacy
            </h1>
            {/* ... (consent text remains unchanged) ... */}
            <div className="flex items-center mb-4">
              <Input type="checkbox" id="consent" className="mr-2" required />
              <label htmlFor="consent" className="text-muted-foreground">
                I acknowledge that I have reviewed and agree to the{" "}
                <a href="#" className="text-primary">
                  Consent and Privacy
                </a>{" "}
                policy.
              </label>
            </div>

            <Button
              type="submit"
              className="bg-blue-500 text-primary-foreground hover:bg-primary/80 p-2 rounded-lg w-full"
              disabled={!isValid}
            >
              {status === "loading" ? "Submitting" : "Finish"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Verification;
