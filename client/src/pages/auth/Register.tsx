// // import { useState } from "react";
// // import { Step1 } from "../../components/auth/signup/Step1";
// // import { Step2 } from "../../components/auth/signup/Step2";
// // import { Step3 } from "../../components/auth/signup/Step3";
// // import { useForm, SubmitHandler } from "react-hook-form";
// // import { InputTypes } from "../../types/types";
// // import { useAuth } from "../../context/authContext";
// // import { useAppDispatch, useAppSelector } from "../../hooks/hook";
// // import { registerUser } from "../../redux/feature/authSlice";
// // import { useToast } from "../../hooks/use-toast";

// // const Register = () => {
// //   const [currentStep, setCurrentStep] = useState<number>(1);
// //   const { setEmail } = useAuth();
// //   const { error } = useAppSelector(state => state.auth);
// //   const { toast } = useToast();

// //   // console.log(error);

// //   const {
// //     register,
// //     formState: { errors, isValid },
// //     handleSubmit,
// //     control,
// //     // reset,
// //   } = useForm<InputTypes>();

// //   const dispatch = useAppDispatch();

// //   const handleRegister: SubmitHandler<InputTypes> = async form => {
// //     console.log(form);
// //     setEmail(form.email);

// //     if (error) {
// //       return toast({
// //         title: "Error Found",
// //         description: error,
// //       });
// //     } else {
// //       nextStep();
// //     }

// //     dispatch(registerUser(form));
// //   };

// //   const nextStep = () => {
// //     setCurrentStep(currentStep + 1);
// //   };

// //   const prevStep = () => {
// //     setCurrentStep(currentStep - 1);
// //   };

// //   switch (currentStep) {
// //     case 1:
// //       return (
// //         <Step1
// //           nextStep={nextStep}
// //           register={register}
// //           errors={errors}
// //           isValid={isValid}
// //         />
// //       );
// //     case 2:
// //       return (
// //         <Step2
// //           nextStep={nextStep}
// //           prevStep={prevStep}
// //           currentStep={currentStep}
// //           handleSubmit={handleSubmit(handleRegister)}
// //           errors={errors}
// //           register={register}
// //           isValid={isValid}
// //           control={control}
// //         />
// //       );
// //     case 3:
// //       return <Step3 prevStep={prevStep} currentStep={currentStep} />;
// //     default:
// //       return (
// //         <Step1
// //           nextStep={nextStep}
// //           register={register}
// //           errors={errors}
// //           isValid={isValid}
// //         />
// //       );
// //   }
// // };

// // export default Register;

// import { useState } from "react";
// import { Step1 } from "../../components/auth/signup/Step1";
// import { Step2 } from "../../components/auth/signup/Step2";
// import { Step3 } from "../../components/auth/signup/Step3";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { InputTypes } from "../../types/types";
// import { useAuth } from "../../context/authContext";
// import { useAppDispatch } from "../../hooks/hook";
// import { registerUser } from "../../redux/feature/authSlice";
// import { useToast } from "../../hooks/use-toast";

// const Register = () => {
//   const [currentStep, setCurrentStep] = useState<number>(1);
//   const { setEmail } = useAuth();

//   const { toast } = useToast();

//   // console.log(error);

//   const {
//     register,
//     formState: { errors, isValid },
//     handleSubmit,
//     control,
//     // reset,
//   } = useForm<InputTypes>();

//   const dispatch = useAppDispatch();

//   const handleRegister: SubmitHandler<InputTypes> = async form => {
//     const result = await dispatch(registerUser(form));
//     setEmail(form.email);

//     if (result.meta.requestStatus === "rejected") {
//       return toast({
//         title: "Error Found",
//         description: result.payload as string,
//       });
//     } else {
//       nextStep(); // Move to the next step if successful
//     }
//   };

//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   const prevStep = () => {
//     setCurrentStep(currentStep - 1);
//   };

//   switch (currentStep) {
//     case 1:
//       return (
//         <Step1
//           nextStep={nextStep}
//           register={register}
//           errors={errors}
//           isValid={isValid}
//         />
//       );
//     case 2:
//       return (
//         <Step2
//           nextStep={nextStep}
//           prevStep={prevStep}
//           currentStep={currentStep}
//           handleSubmit={handleSubmit(handleRegister)}
//           errors={errors}
//           register={register}
//           isValid={isValid}
//           control={control}
//         />
//       );
//     case 3:
//       return <Step3 prevStep={prevStep} currentStep={currentStep} />;
//     default:
//       return (
//         <Step1
//           nextStep={nextStep}
//           register={register}
//           errors={errors}
//           isValid={isValid}
//         />
//       );
//   }
// };

// export default Register;

import { useState } from "react";
import { Step1 } from "../../components/auth/signup/Step1";
import { Step2 } from "../../components/auth/signup/Step2";
import { Step3 } from "../../components/auth/signup/Step3";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputTypes } from "../../types/types";
import { useAuth } from "../../context/authContext";
<<<<<<< HEAD
import { useAppDispatch } from "../../hooks/hook";
import { registerUser } from "../../redux/feature/authSlice";
import { useToast } from "../../hooks/use-toast";
=======
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
>>>>>>> development

const Register = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { setEmail } = useAuth();
<<<<<<< HEAD

  const { toast } = useToast();

  // console.log(error);
=======
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
>>>>>>> development

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    control,
    // reset,
  } = useForm<InputTypes>();

<<<<<<< HEAD
  const dispatch = useAppDispatch();

  const handleRegister: SubmitHandler<InputTypes> = async form => {
    const result = await dispatch(registerUser(form));
    setEmail(form.email);

    if (result.meta.requestStatus === "rejected") {
      return toast({
        title: "Error Found",
        description: result.payload as string,
      });
    } else {
      nextStep(); // Move to the next step if successful
=======
  const handleRegister: SubmitHandler<InputTypes> = async (form) => {
    setEmail(form.email);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        form
      );

      if (data.success === true) {
        setModalMessage("You have successfully been registered");
        setIsModalOpen(true);

        setTimeout(() => {
          nextStep();
        }, 2000);
      }

      Cookies.set("locumToken", data.locumToken);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      setModalMessage(
        axiosError?.response?.data?.message ||
          "An error occurred during registration."
      );
      setIsModalOpen(true);
>>>>>>> development
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
          msg={modalMessage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
