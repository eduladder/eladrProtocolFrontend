import "./style.css";
import Footer from "../../components/footer";
import Header from "../../components/header";

export default function Contact() {
  return (
    <div className="contact">
      <Header />
      <textarea
        id="reason"
        name="reason"
        rows="10"
        cols="100"
        className="contact_box"
      ></textarea>
      <Footer />
    </div>
  );
}
