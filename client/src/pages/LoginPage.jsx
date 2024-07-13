import AuthTemplate from "../components/Auth/AuthTemplate";
import loginImg from "../assets/images/login.webp";

const LoginPage = () => {
  return (
    <AuthTemplate
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  );
};

export default LoginPage;
