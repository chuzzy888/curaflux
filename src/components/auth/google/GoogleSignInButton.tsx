import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import google from "../../../assets/images/Google.png";

import { Modal } from "../../modals/Success-Modal";
import useAuthStore from "../../../redux/store/authStore";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

const GoogleSignInButton = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    modalMessage,
    setModalMessage,
    isSubmitting,
    setIsSubmitting,
  } = useAuthStore();

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (isSubmitting) return; // Prevent multiple requests

    setIsSubmitting(true); // Start submitting
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      let decode: CustomJwtPayload | null = null;
      if (idToken) {
        decode = jwtDecode<CustomJwtPayload>(idToken);
      }

      if (decode) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/signin`,
          {
            email: decode.email,
            password: import.meta.env.VITE_GOOGLE_PASSWORD,
          }
        );

        if (data.locumToken) {
          Cookies.set("locumToken", data.locumToken);
          Cookies.set("locumVerified", "true");

          setModalMessage("You have successfully logged in.");
          setIsModalOpen(true);

          setTimeout(() => {
            navigate("/shift");
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);

      const axiosError = error as AxiosError<{ message: string }>;

      // Display backend error if present, otherwise a default sign-in error
      setModalMessage(
        axiosError?.response?.data?.message ||
          "An error occurred during sign-in."
      );
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  return (
    <>
      <button onClick={handleSignIn} className="mt-3" disabled={isSubmitting}>
        <img src={google} alt="google-signup" />
      </button>

      <Modal
        msg={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default GoogleSignInButton;
