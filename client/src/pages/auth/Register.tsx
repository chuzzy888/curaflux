import { useState } from "react";
import { Step1 } from "../../components/auth/signup/Step1";
import { Step2 } from "../../components/auth/signup/Step2";
import { Step3 } from "../../components/auth/signup/Step3";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputTypes } from "../../types/types";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../hooks/use-toast";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const Register = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { setEmail } = useAuth();

  const { toast } = useToast();

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    control,
    // reset,
  } = useForm<InputTypes>();

  const handleRegister: SubmitHandler<InputTypes> = async (form) => {
    setEmail(form.email);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        form
      );

      console.log(data);

      Cookies.set("token", data.token);

      toast({
        title: "Registration Successful",
        description: "You have successfully been registered",
      });

      nextStep();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      toast({
        title: "Error Found",
        description:
          axiosError?.response?.data?.message ||
          "An error occurred during login.",
      });
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  switch (currentStep) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          register={register}
          errors={errors}
          isValid={isValid}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
          handleSubmit={handleSubmit(handleRegister)}
          errors={errors}
          register={register}
          isValid={isValid}
          control={control}
          isSubmitting={isSubmitting}
        />
      );
    case 3:
      return <Step3 prevStep={prevStep} currentStep={currentStep} />;
    default:
      return (
        <Step1
          nextStep={nextStep}
          register={register}
          errors={errors}
          isValid={isValid}
        />
      );
  }
};

export default Register;
