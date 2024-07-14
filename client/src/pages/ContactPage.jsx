import ContactFormSection from "../components/About/ContactFormSection";
import ContactDetails from "../components/Contact/ContactDetails";
import ContactUsForm from "../components/Contact/ContactUsForm";
import Footer from "../components/Footer";
import ReviewSlider from "../components/ReviewSlider";

const ContactPage = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col lg:flex-row justify-between gap-10 text-white">
        {/* contact details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* contact form */}
        <div className="lg:w-[60%]">
          <ContactFormSection />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
