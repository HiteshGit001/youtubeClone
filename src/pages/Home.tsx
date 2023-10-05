import { useEffect } from 'react'
// import { axiosGet } from '../utils/https.server'
import VideoCard from '../components/VideoCard/VideoCard'

import { fetchVideos } from "../store/slice/videoDetailsSlice"
import { useDispatch } from 'react-redux'
import useAppSelector from '../hooks/useAppSelector';
import { Col, Row } from 'antd';
import Filter from '../components/Filter/Filter';

const Home = () => {
  const dispatch = useDispatch();

  const { videoList, nextVideosToke } = useAppSelector((state) => state.videoDetails)
  useEffect(() => {
    if (!videoList?.length) {
      fetchVideos(dispatch, []);
    }
  }, []);

  const handleInfiniteScroll = async () => {
    try {
      if (window.innerHeight +
        document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        fetchVideos(dispatch, videoList, nextVideosToke);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [nextVideosToke])


  return (
    <div className="p_6">
      <Filter />
      <Row gutter={22}>
        {
          videoList?.map((ele) => {
            return (
              <Col sm={12} md={8}>
                <VideoCard
                  isVertical
                  videoDetails={ele}
                />
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

export default Home