import { useEffect, useState } from 'react'
import cx from "classnames";
import { axiosGet } from '../utils/https.server'
import { GET_ALL_LIKED_VIDEOS_URL } from '../api/api'
import useAppSelector from '../hooks/useAppSelector'
import { HttpStatusCode } from 'axios'
import { Col, Row } from 'antd'
import VideoCard from '../components/VideoCard/VideoCard'

const LikedVideos = () => {
  const { userData } = useAppSelector((state) => state.auth);

  const [isLiked, setIsLiked] = useState<boolean>(true);
  const [likedVideos, setLikedVideos] = useState([]);
  const fetchLikedVideos = async () => {
    try {
      const response = await axiosGet(`${GET_ALL_LIKED_VIDEOS_URL}/${userData?.loggerId}`, true);
      if (response.status === HttpStatusCode.Ok) {
        setLikedVideos(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLikedVideos()
  }, [userData?.loggerId])

  console.log(likedVideos?.filter((ele: any) => ele?.isLiked === isLiked), "lik")

  return (
    <>
      {likedVideos.length
        ? <Row gutter={22}>
          <div className={cx('flex g_2 pb_2 w_100 align_center')}>
            {
              ["Liked", "Disliked"]?.map((ele: string) => {
                return (
                  <div
                    onClick={() => setIsLiked(ele === "Liked")}
                    key={ele}
                    className={cx('w_max_content py_2 px_4 br_4 pointer tt_capitalize', ele === (isLiked ? "Liked" : "Disliked") ? "black" : "white", ele === (isLiked ? "Liked" : "Disliked") ? "bg_white primary" : "bg_gray")}
                  >
                    {ele}
                  </div>
                )
              })
            }
          </div>
          {
            likedVideos?.filter((ele: any) => ele?.isLiked === isLiked)?.map((ele: any, index: number) => {
              return (
                <Col key={ele?._id + index} sm={12} md={8}>
                  <VideoCard
                    isVertical
                    videoDetails={ele}
                  />
                </Col>
              )
            })
          }
        </Row>
        : <p className='ta_center w_100 fs_md h_100vh'>You have not liked video yet...</p>
      }
    </>
  )
}

export default LikedVideos