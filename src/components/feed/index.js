import "./style.css";
import { Link } from "react-router-dom";

export default function Feed({ feed, home }) {
  return (
    <Link to={`/${feed.hashmeta}`}>
      <div className="feed">
        <div className="feed_header">
          <div className="feed_title">{feed.title}</div>
          <div className="feed_description">{feed.description}</div>
        </div>
        {home && <div className="feed_bg"></div>}
      </div>
    </Link>
  );
}
