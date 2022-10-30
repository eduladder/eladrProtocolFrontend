import "./style.css";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function TermsOfServices() {
  return (
    <div className="terms_of_services">
      <Header />
      <textarea
        id="reason"
        name="reason"
        rows="10"
        cols="100"
        className="terms_of_services_box"
      ></textarea>
      <Footer />
    </div>
  );
}
