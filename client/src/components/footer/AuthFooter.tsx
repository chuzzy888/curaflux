import authLogo from "../../assets/images/authLg.png";
import instagram from "../../assets/images/instagram.png";
import facebook from "../../assets/images/facebook.png";
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";
import threads from "../../assets/images/threads.png";
import youtube from "../../assets/images/youtube.png";

const AuthFooter = () => {
  return (
    <main className="flex flex-wrap justify-around lg:justify-between items-center mt-16">
      <img src={authLogo} alt="auth-logo" />
      <p className="text-sm text-gray-600 hidden md:block">
        All copyrights reserved
      </p>
      <section className=" flex items-center gap-3">
        <a href="">
          <img src={instagram} alt="auth-logo" />
        </a>
        <a href="">
          {" "}
          <img src={facebook} alt="auth-logo" />
        </a>
        <a href="">
          <img src={linkedin} alt="auth-logo" />
        </a>
        <a href="">
          {" "}
          <img src={twitter} alt="auth-logo" />
        </a>
        <a href="">
          {" "}
          <img src={threads} alt="auth-logo" />
        </a>
        <a href="">
          {" "}
          <img src={youtube} alt="auth-logo" />
        </a>
      </section>
    </main>
  );
};

export default AuthFooter;
