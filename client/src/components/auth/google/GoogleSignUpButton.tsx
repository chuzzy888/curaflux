import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import googleSignup from "../../../assets/images/googleSignup.png";
import { Modal } from "../../modals/Success-Modal";
import { useState } from "react";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

const GoogleSignUpButton = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const idToken = await result.user.getIdToken();

        let decode: CustomJwtPayload | null = null;
        if (idToken) {
          decode = jwtDecode<CustomJwtPayload>(idToken);
        }

        // console.log(decode);

        if (decode) {
          const namePart = decode.name?.split(" ");

          const nickName = namePart ? namePart[1] : "";

          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/signup`,
            {
              fullName: decode.name,
              nickName: nickName,
              email: decode.email,
              password: import.meta.env.VITE_GOOGLE_PASSWORD,
            }
          );

          if (data.token) {
            Cookies.set("token", data.token);
            setModalMessage("You have successfully logged in.");
            setIsModalOpen(true);

            setTimeout(() => {
              navigate("/verify");
            }, 2000);
          }
        }
      })
      .catch((error) => {
        console.error(error);

        const axiosError = error as AxiosError<{ message: string }>;

        setModalMessage(
          axiosError?.response?.data?.message ||
            "An error occurred during registration."
        );
        setIsModalOpen(true);
      });
  };

  return (
    <button onClick={handleSignUp}>
      <img src={googleSignup} alt="google-signup" />

      <Modal
        msg={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </button>
  );
};

export default GoogleSignUpButton;
