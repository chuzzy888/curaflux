import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import googleSignup from "../../../assets/images/googleSignup.png";
import { Modal } from "../../modals/Success-Modal";
import useAuthStore from "../../../redux/store/authStore";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

const GoogleSignUpButton = () => {
  const navigate = useNavigate();
    const {
      isModalOpen,
      setIsModalOpen,
      modalMessage,
      setModalMessage,
      isSubmitting,
      setIsSubmitting,
    } = useAuthStore();

  const handleSignUp = async () => {
    if (isSubmitting) return; // Prevents multiple requests

    setIsSubmitting(true); // Set submitting state
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      let decode: CustomJwtPayload | null = null;
      if (idToken) {
        decode = jwtDecode<CustomJwtPayload>(idToken);
      }

      if (decode) {
        const namePart = decode.name?.split(" ");
        const nickName = namePart ? namePart[1] : "";

        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/signup`,
          {
            fullName: decode.name,
            nickName,
            email: decode.email,
            password: import.meta.env.VITE_GOOGLE_PASSWORD,
          }
        );

        if (data.locumToken) {
          Cookies.set("locumToken", data.locumToken);
          setModalMessage("You have successfully logged in.");
          setIsModalOpen(true);

          setTimeout(() => {
            navigate("/verify");
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);

      const axiosError = error as AxiosError<{ message: string }>;

      // Set specific backend error message if available
      if (axiosError?.response?.data?.message) {
        setModalMessage(axiosError.response.data.message);
      } else {
        setModalMessage("An error occurred during registration.");
      }

      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <>
      <button onClick={handleSignUp} disabled={isSubmitting}>
        <img src={googleSignup} alt="google-signup" />
      </button>

      <Modal
        msg={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default GoogleSignUpButton;
