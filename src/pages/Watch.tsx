/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { useLocation, useSearchParams } from 'react-router-dom'
import useAppSelector from '../hooks/useAppSelector'
import VideoCard from '../components/VideoCard/VideoCard'
import { fetchSearchResults, fetchSelectedChannel } from '../store/slice/searchSlice'
import { useDispatch } from 'react-redux'
import { ServerKeys } from '../api/serverKeys'
import { formatSubscriberCount } from '../helper/numberFormatter'
import CustomButton from '../components/custom/CustomButton'
import { axiosDelete, axiosGet, axiosPost } from '../utils/https.server'
import { FIND_ONE_SUBSCRIBE_URL, GET_ONE_LIKED_VIDEO_URL, LIKE_VIDEO_URL, SUBSCRIBE_URL, UNSUBSCRIBE_URL, UPDATE_LIKE_VIDEO_URL } from '../api/api'
import { HttpStatusCode } from 'axios'
import Dislike from "../assets/icons/icons/Dislike.svg"
import Like from "../assets/icons/icons/Like.svg"
import DislikeFill from "../assets/icons/selectedIcons/DislikeFill.svg"
import LikeFill from "../assets/icons/selectedIcons/LikeFill.svg"
import { getLocalStorage } from '../utils/webStorage'
import { useData } from '../context/DataContext'


const Watch = () => {
  const [queryParams] = useSearchParams();
  const { state } = useLocation();
  const videoId: any = queryParams.get("v");
  const channelId: any = videoId.split(",")?.[1]

  const { searchedList, nextSearchToken, selectedChannelList } = useAppSelector((state) => state.search);
  const { relatedKey } = useAppSelector((state) => state.videoDetails)
  const { userData } = useAppSelector((state) => state.auth);
  const { success } = useData()
  const dispatch = useDispatch();

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>();

  const loggerID = getLocalStorage("loggerId") || "";

  const channelDetails: any = selectedChannelList?.[0];

  const handleInfiniteScroll = async () => {
    try {
      if (window.innerHeight +
        document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        fetchSearchResults(dispatch, searchedList, relatedKey, nextSearchToken)
      }
    } catch (error) {
      console.log(error);
      success("error", "Something went wrong", 10)
    }
  }

  const handleSubscribe = async () => {
    try {
      const response = await axiosPost(SUBSCRIBE_URL, { channelDetails, channelName: channelDetails?.snippet?.title, loggerId: loggerID, channelId: channelDetails?.id, channelDpUrl: channelDetails?.[ServerKeys.SNIPPET]?.[ServerKeys.THUMBNAILS]?.[ServerKeys.DEFAULT]?.[ServerKeys.URL], email: userData?.email }, true)
      if (response.status === HttpStatusCode.Ok) {
        setIsSubscribed(true)
      }
    } catch (error) {
      console.log(error)
      success("error", "Something went wrong", 10)
    }
  }

  const handleUnsubscribe = async () => {
    try {
      const response = await axiosDelete(`${UNSUBSCRIBE_URL}/${channelId}/${loggerID}`, true)
      if (response.status === HttpStatusCode.Ok) {
        setIsSubscribed(false)
      }
      console.log(response, "uns")
    } catch (error) {
      console.log(error)
      success("error", "Something went wrong", 10)
    }
  }

  const checkIsSubscribed = async () => {
    try {
      const response = await axiosGet(`${FIND_ONE_SUBSCRIBE_URL}/${channelId}/${loggerID}`, true)
      if (response.status === HttpStatusCode.Ok) {
        if (response?.data?.channelId) {
          setIsSubscribed(true)
        }
      }
    } catch (err) {
      console.log(err)
      success("error", "Something went wrong", 10)
    }
  }

  const checkIsLiked = async () => {
    try {
      const response = await axiosGet(`${GET_ONE_LIKED_VIDEO_URL}/${videoId}/${loggerID}`, true);
      if (response?.data?.videoId) {
        setIsLiked(response?.data?.isLiked);
      }
    } catch (error) {
      console.log(error)
      success("error", "Something went wrong", 10)
    }
  }

  const handleLike = async (isLiked: boolean) => {
    try {
      const body = {
        loggerId: loggerID,
        channelId,
        videoId,
        isLiked,
        thumbnailUrl: state,
        snippet: channelDetails?.[ServerKeys.SNIPPET]
      }
      const response = await axiosPost(`${LIKE_VIDEO_URL}`, body, true);
      if (response?.status === HttpStatusCode.Ok) {
        if (response?.data?.videoId) {
          setIsLiked(true);
        }
      }
      console.log(response)
    } catch (error) {
      console.log(error)
      success("error", "Something went wrong", 10)
    }
  }

  const handleUpdateLike = async () => {
    try {
      const response = await axiosDelete(`${UPDATE_LIKE_VIDEO_URL}${loggerID}/${videoId}/${true}`, true);
      if (response?.status === HttpStatusCode.Ok) {
        setIsLiked(undefined);
      }
    } catch (error) {
      console.log(error)
      success("error", "Something went wrong", 10)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [nextSearchToken])

  useEffect(() => {
    checkIsLiked();
    checkIsSubscribed();
    // fetchAllSubscribe(dispatch, loggerID)
    fetchSearchResults(dispatch, [], relatedKey);
    fetchSelectedChannel(dispatch, channelId);
  }, [])

  return (
    // <>
    <Row>
      <Col sm={24} md={17}>
        <ReactPlayer controls playing loop width="100%" url={`https://www.youtube.com/watch?v=${videoId}`} />
        <Row className='py_4 g_4'>
          <Col className='flex align_start g_4'>
            <img className='chanel_img' src={channelDetails?.[ServerKeys.SNIPPET]?.[ServerKeys.THUMBNAILS]?.[ServerKeys.DEFAULT]?.[ServerKeys.URL]} />
          </Col>
          <Col>
            <p>{channelDetails?.[ServerKeys.SNIPPET]?.[ServerKeys.TITLE]}</p>
            <p>{`${formatSubscriberCount(channelDetails?.[ServerKeys.STATISTICS]?.[ServerKeys.SUBSCRIBER_COUNT])} subscribers`}</p>
          </Col>
          <Col>
            {
              !isSubscribed
                ? <CustomButton onClick={() => handleSubscribe()} className="btn_secondary br_4" label="Subscribe" />
                : <CustomButton onClick={() => handleUnsubscribe()} className='btn_lightgray black br_4' label="Subscribed" />
            }
          </Col>
          <Col>
            <img className='pointer' onClick={() => isLiked ? handleUpdateLike() : handleLike(true)} src={isLiked ? LikeFill : Like} alt="like" />
            <img className='pointer' onClick={() => isLiked === false ? handleUpdateLike() : handleLike(false)} src={isLiked === false ? DislikeFill : Dislike} alt="dis like" />
          </Col>
        </Row>
      </Col>
      <Col className='px_2' sm={24} md={7}>
        {
          searchedList?.map((ele) => {
            return (
              <Col className='h_30' sm={24} md={24}>
                {
                  ele?.id?.videoId
                    ? <VideoCard
                      isVertical
                      videoDetails={ele}
                    />
                    : <></>
                }
              </Col>
            )
          })
        }
      </Col>
    </Row>
    // </>
  )
}

export default Watch