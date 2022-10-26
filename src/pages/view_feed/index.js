import "./style.css";
import { useParams } from "react-router-dom";

export default function ViewFeed() {
  const { username } = useParams();
  return <div>ViewFeed</div>;
}
