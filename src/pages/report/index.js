import "./style.css";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Report() {
  return (
    <div className="report">
      <Header />
      <div className="report_container">
        <div className="report_title">
          Reason why it shouldn't be on on Eduladder
        </div>
        <textarea
          id="reason"
          name="reason"
          rows="10"
          cols="100"
          placeholder="Reason..."
          className="report_reason"
        ></textarea>
        <button className="report_btn">Report</button>
      </div>
      <Footer />
    </div>
  );
}
