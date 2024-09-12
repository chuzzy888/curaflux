import { useState } from "react";
import { Step1 } from "../../components/auth/signup/Step1";
import { Step2 } from "../../components/auth/signup/Step2";
import { Step3 } from "../../components/auth/signup/Step3";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputTypes } from "../../types/types";
import axios from "axios";
import cookies from "js-cookie";
import { useAuth } from "../../context/authContext";

const Register = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { setEmail } = useAuth();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    // reset,
  } = useForm<InputTypes>();

  const handleRegister: SubmitHandler<InputTypes> = async (form) => {
    console.log(form);
    setEmail(form.email);

    if (form) {
      setTimeout(() => {
        nextStep();
      }, 3000);
    }

    const { data } = await axios.post(
      "http://localhost:3000/auth/signup",
      form
    );

    console.log(data);
    cookies.set("token", data.token);
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
