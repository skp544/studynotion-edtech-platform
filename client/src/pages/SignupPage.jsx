import signupImg from "../assets/images/signup.webp";
import AuthTemplate from "../components/Auth/AuthTemplate";

const SignupPage = () => {
  return (
    <AuthTemplate
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  );
};

export default SignupPage;
