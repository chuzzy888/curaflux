// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "./firebaseConfig";
// import axios from "axios";
// import { jwtDecode, JwtPayload } from "jwt-decode";

// interface CustomJwtPayload extends JwtPayload {
//   name?: string;
//   email?: string;
// }

// const GoogleSignInButton = () => {

//   const handleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then(async result => {
//         const idToken = await result.user.getIdToken();

//         let decode: CustomJwtPayload | null = null;
//         if (idToken) {
//           decode = jwtDecode(idToken);
//         }
//         console.log(decode);

//         const namePart = decode?.name?.split(" ");
//         const firstName = namePart[0];
//         const lastName = namePart[1];
//         console.log(firstName);
//         console.log(lastName);

//         const { data } = await axios.post("http://localhost:3000/auth/signup", {
//           firstName: firstName,
//           lastName: lastName,
//           email: decode?.email,
//           password: "google",
//         });
//         console.log(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return <button onClick={handleSignIn}>Sign in with Google</button>;
// };

// export default GoogleSignInButton;

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

// Define a custom interface that extends JwtPayload
interface CustomJwtPayload extends JwtPayload {
  name?: string;
  email?: string;
}

const GoogleSignInButton = () => {
  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async result => {
        const idToken = await result.user.getIdToken();

        let decode: CustomJwtPayload | null = null;
        if (idToken) {
          decode = jwtDecode<CustomJwtPayload>(idToken);
        }

        if (decode) {
          const namePart = decode.name?.split(" ");
          const firstName = namePart ? namePart[0] : "";
          const lastName = namePart ? namePart[1] : "";
          console.log(firstName);
          console.log(lastName);

          const { data } = await axios.post(
            "http://localhost:3000/auth/signup",
            {
              firstName: firstName,
              lastName: lastName,
              email: decode.email,
              password: "google",
            }
          );
          console.log(data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};

export default GoogleSignInButton;
