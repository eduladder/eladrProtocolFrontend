import "./style.css";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { useEffect, useRef, useState } from "react";

export default function Report() {
  const container = useRef();
  const [spaceLeft, setSpaceLeft] = useState();
  useEffect(() => {
    function handleWindowResize() {
      console.log(window.innerHeight, container.current.clientHeight + 166);
      setSpaceLeft(window.innerHeight - (container.current.clientHeight + 166));
    }
    setSpaceLeft(window.innerHeight - (container.current.clientHeight + 166));

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  return (
    <div className="report">
      <Header />
      <div className="report_container" ref={container}>
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
      {spaceLeft < 85 ? <Footer scrollable /> : <Footer />}
    </div>
  );
}
