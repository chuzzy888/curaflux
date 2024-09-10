import { useState } from "react";
import { Step1 } from "../../components/auth/signup/Step1";
import { Step2 } from "../../components/auth/signup/Step2";
import { Step3 } from "../../components/auth/signup/Step3";

const Register = () => {
  // State to track the current step
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Move to the next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Move to the previous step if needed
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render the appropriate step based on `currentStep`
  switch (currentStep) {
    case 1:
      return (
        <Step1
          nextStep={nextStep}
          //   handleInputChange={handleInputChange}
          //   formData={formData}
        />
      );
    case 2:
      return (
        <Step2
          nextStep={nextStep}
          prevStep={prevStep}
          currentStep={currentStep}
          //   handleInputChange={handleInputChange}
          //   formData={formData}
        />
      );
    case 3:
      return (
        <Step3
          prevStep={prevStep}
          currentStep={currentStep}
          //   handleSubmit={handleSubmit}
          //   handleInputChange={handleInputChange}
          //   formData={formData}
        />
      );
    default:
      return (
        <Step1
          nextStep={nextStep}
          //   handleInputChange={handleInputChange}
          //   formData={formData}
        />
      );
  }
};

export default Register;
