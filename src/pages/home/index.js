import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { postsReducer } from "../../reducers/reducers";
import Header from "../../components/header";
import Feed from "../../components/feed";
import "./style.css";
import Footer from "../../components/footer";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home() {
  const page = 1;
  const apiPaths = `${process.env.REACT_APP_BACKEND_URL}/files/`;
  const[feeds,setFeeds] =useState([]);

  const getAllFeeds= () =>{
    let PageNo=Math.ceil((feeds.length/10)+1);
    const finalUrl = apiPaths + PageNo;
    axios.get(finalUrl).then((res)=>{
      const apiRes = res?.data;
      const mergeData = [...feeds,...apiRes]
      setFeeds(mergeData);
    }).catch((err)=>{ 
      console.error("Error while loading the page",err)
    })
  }

  const fetchMoreData = () =>{
    getAllFeeds()
  }
  const [loading] = useState(false);

  useEffect(() => {
    getAllFeeds();
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="feeds">

      <InfiniteScroll
        dataLength={feeds.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          feeds.map((feed, i) => <Feed feed={feed} key={i} home />)
        )}

      </InfiniteScroll>
      </div>
      {!loading && <Footer scrollable />}
    </div>
  );
}
