import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Feed({ feed, home }) {
  const [fileType, setFileType] = useState('');

  const fetchFileType = async (metaHash) => {
    const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/meta/${metaHash}`)
    setFileType(data.fileType.split('/')[0])
  }

  useEffect( () => {
     fetchFileType(feed.hashmeta)
  }, [])


  return (
    <Link to={`/${feed.hashmeta}`}>
      <div className="feed">
        <div className="feed_header">
          <div className="feed_title">{feed.title.toString().length > 30 ? `${feed.title.toString().slice(0, 31)}.....` : feed.title}</div>
          <div className="feed_description">{feed.description.toString().length > 30 ? `${feed.description.toString().slice(0, 31)}.....` : feed.description}</div>
        </div>
        {home && 
        (fileType === 'image' && (feed.hashthumbnail ? <div className="feed_bg" style={{backgroundImage: `url(https://gateway.ipfs.io/ipfs/${feed?.hashthumbnail})`}}></div> : 
        <div className="feed_bg" style={{backgroundImage: `url(https://gateway.ipfs.io/ipfs/${feed?.hashvideo})`}}></div>))
        }

        {home && 
        (fileType === 'video' && ((feed.hashthumbnail ? <div className="feed_bg" style={{backgroundImage: `url(https://gateway.ipfs.io/ipfs/${feed?.hashthumbnail})`}}></div> : 
        <div className="feed_bg" style={{backgroundImage: `url(https://www.mstcindia.co.in/mstc_static_pages/frontpage/video.png)`}}></div>)))
        }

        {home && 
        (fileType === 'audio' && (feed.hashthumbnail ? <div className="feed_bg" style={{backgroundImage: `url(https://gateway.ipfs.io/ipfs/${feed?.hashthumbnail})`}}></div> : 
        <div className="feed_bg" style={{backgroundImage: `url(https://www.musicconstructed.com/wp-content/themes/musicconstructed-1.2.0/dist/img/default-icon-collection.jpg)`}}></div>))
        }

        {home && 
        (fileType !== "image" &&
        fileType !== "video" &&
        fileType !== "audio" && (feed.hashthumbnail ? <div className="feed_bg" style={{backgroundImage: `url(https://gateway.ipfs.io/ipfs/${feed?.hashthumbnail})`}}></div> : 
        <div className="feed_bg" style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbbsdISaGA4xlm5Hw7QTvXkrU1z9m6RR5aikVSSkw3sdrwNr4Y0S7B0HDHHLhJ5RWYP7g&usqp=CAU)`}}></div>))
        }
        
      </div>
    </Link>
  );
}
