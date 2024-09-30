import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScreenLayout } from "../../../components/layout/ScreenLayout";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import useAuthStore from "../../../redux/store/authStore";
import { Editor } from "primereact/editor";
import { Button } from "../../../components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from "js-cookie";

type EditProfileType = {
  fullName: string;
  specialty: string;
  experience: string;
  availableWork: string;
  availableTime: string;
  photo: File | null;
};

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

const EditProfile = () => {
  const { userId } = useParams();
  const { userInfo, setUserInfo } = useAuthStore();
  const [text, setText] = useState(userInfo?.bio || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const token = Cookies.get("token");
  const decode = token ? jwtDecode<CustomJwtPayload>(token) : null;

  const [certifications, setCertifications] = useState<string[]>(
    userInfo?.certifications || []
  );
  const [currentCertification, setCurrentCertification] = useState<string>("");

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<EditProfileType>();

  useEffect(() => {
    // Initialize previewUrl with userInfo.photo if available
    if (userInfo.photo) {
      setPreviewUrl(userInfo.photo);
    }
  }, [userInfo.photo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCertification(e.target.value);
  };

  const handleAddCertification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentCertification.trim() !== "") {
      setCertifications([...certifications, currentCertification]);
      setCurrentCertification("");
    }
  };

  const handleDeleteCertification = (certificationToDelete: string) => {
    setCertifications(
      certifications.filter((cert) => cert !== certificationToDelete)
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setValue("photo", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile: SubmitHandler<EditProfileType> = async (form) => {
    const formData = new FormData();
    if (form.photo) {
      formData.append("photo", form.photo);
    }
    formData.append("fullName", form.fullName);
    formData.append("specialty", form.specialty);
    formData.append("experience", form.experience);
    formData.append("availableWork", form.availableWork);
    formData.append("availableTime", form.availableTime);
    formData.append("bio", text);
    formData.append("certifications", certifications.join(", "));

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/auth/verify/${userId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success === true) {
        window.location.href = `/profile/${data.updatedUser.nickName}`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAUserInfo = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/auth/user/${decode?.userId}`
      );

      setUserInfo(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAUserInfo();
  }, [decode?.userId]);

  console.log(userInfo);

  return (
    <main className="pt-20 pb-10">
      <ScreenLayout>
        <h1 className="text-2xl font-bold">Edit Profile</h1>

        <form onSubmit={handleSubmit(handleEditProfile)}>
          <section className="mt-5 grid grid-cols-2 gap-8">
            {/* selecting and previewing images */}
            {/* Image Preview Section */}
            <div className="flex flex-wrap gap-4">
              <div className="relative overflow-hidden h-32 w-32 mx-auto rounded-full bg-gray-200 mb-4">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                ) : (
                  <p className="text-center text-gray-500">No Image Selected</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Form fields */}
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                defaultValue={userInfo.fullName}
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs">
                  {"Please input your full name"}
                </p>
              )}
            </div>

            <div>
              <Label>Specialty</Label>
              <Input
                type="text"
                defaultValue={userInfo.specialty}
                {...register("specialty", {
                  required: "Specialty is required",
                })}
              />
              {errors.specialty && (
                <p className="text-red-500 text-xs">
                  {"Please input your specialty"}
                </p>
              )}
            </div>

            {/* Other fields */}
            <div>
              <Label>Years of Experience</Label>
              <Input
                type="number"
                defaultValue={userInfo.experience || 0}
                {...register("experience", {
                  required: "Years of Experience is required",
                })}
              />
              {errors.experience && (
                <p className="text-red-500 text-xs">
                  {"Please input your level of experience"}
                </p>
              )}
            </div>

            <div className=" relative">
              <Label>Availability</Label>
              <Input
                type="text"
                defaultValue={userInfo.availableWork}
                {...register("availableWork", {
                  required: "Please input your availability",
                })}
              />
              {errors.availableWork && (
                <p className="text-red-500 text-xs">
                  {"Please input your availability"}
                </p>
              )}

              <p className=" text-[12px] absolute top-9 right-2">
                i.e: 3 days/week
              </p>
            </div>

            <div className=" relative">
              <Label>Time</Label>
              <Input
                type="text"
                defaultValue={userInfo.availableTime}
                {...register("availableTime", {
                  required: "Please input your available time",
                })}
              />
              {errors.availableTime && (
                <p className="text-red-500 text-xs">
                  {"Please input your available time"}
                </p>
              )}

              <p className=" text-[12px] absolute top-9 right-2">
                i.e: 8am - 6pm
              </p>
            </div>
          </section>

          {/* Bio Section */}
          <section className="mt-5 grid grid-cols-2 gap-8">
            <div>
              <Label>Bio</Label>
              <Editor
                value={text}
                onTextChange={(e) => setText(e.htmlValue || "")}
                style={{ height: "320px" }}
              />
            </div>

            {/* Certifications Section */}
            <div>
              <Label>Certifications</Label>
              <div className="flex gap-1">
                <Input
                  type="text"
                  value={currentCertification}
                  onChange={handleInputChange}
                  placeholder="Add a certification"
                />
                <Button onClick={handleAddCertification} size={"sm"}>
                  Add
                </Button>
              </div>

              {/* Display added certifications */}
              <ul className="flex gap-2 mt-2 items-center">
                {certifications.map((certification, index) => (
                  <li key={index} className="relative bg-white shadow p-2 px-4">
                    {certification}
                    <button
                      type="button"
                      onClick={() => handleDeleteCertification(certification)}
                      className="text-[12px] border border-red-400 h-4 w-4 absolute top-0 rounded-full"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Button className="mt-5 bg-[#009FF5]" disabled={isSubmitting}>
            {isSubmitting ? "Saving Changes" : "Save Changes"}
          </Button>
        </form>
      </ScreenLayout>
    </main>
  );
};

export default EditProfile;
