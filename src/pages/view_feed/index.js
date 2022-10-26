import "./style.css";
import { useParams } from "react-router-dom";
import Header from "../../components/header";

export default function ViewFeed() {
  const { id } = useParams();
  return (
    <div className="view_feed">
      <Header />
    </div>
  );
}
