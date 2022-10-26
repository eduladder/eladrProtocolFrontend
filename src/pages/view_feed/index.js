import "./style.css";
import { useParams } from "react-router-dom";

export default function ViewFeed() {
  const { id } = useParams();
  return <div>ViewFeed</div>;
}
