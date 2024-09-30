import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import google from "../../../assets/images/Google.png";
import { useState } from "react";
import { Modal } from "../../modals/Success-Modal";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

const GoogleSignInButton = () => {
 
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSignIn = () => {
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
          const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/signin`,
            {
              email: decode.email,
              password: import.meta.env.VITE_GOOGLE_PASSWORD,
            }
          );

          if (data.token) {
            Cookies.set("token", data.token);

            setModalMessage("You have successfully logged in.");
            setIsModalOpen(true);

            setTimeout(() => {
              navigate("/shift");
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
    <button onClick={handleSignIn} className=" mt-3">
      <img src={google} alt="google-signup" />

      <Modal
        msg={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </button>
  );
};

export default GoogleSignInButton;
