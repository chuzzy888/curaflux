import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios, { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { auth } from "../../../firebaseConfig";
import { useToast } from "../../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import googleSignup from "../../../assets/images/googleSignup.png";

interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

const GoogleSignUpButton = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const idToken = await result.user.getIdToken();

        let decode: CustomJwtPayload | null = null;
        if (idToken) {
          decode = jwtDecode<CustomJwtPayload>(idToken);
        }

        console.log(decode);

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
            navigate("/verify");
          }
        }
      })
      .catch((error) => {
        console.error(error);

        const axiosError = error as AxiosError<{ message: string }>;

        toast({
          title: "Error Found",
          description:
            axiosError?.response?.data?.message ||
            "An error occurred during Registration.",
        });
      });
  };

  return (
    <button onClick={handleSignUp}>
      <img src={googleSignup} alt="google-signup" />
    </button>
  );
};

export default GoogleSignUpButton;
