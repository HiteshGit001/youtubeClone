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


const Watch = () => {
  const [queryParams] = useSearchParams();
  const { state } = useLocation();
  console.log(state, "state");
  const videoId: any = queryParams.get("v");
  const channelId: any = videoId.split(",")?.[1]

  const { searchedList, nextSearchToken, selectedChannelList } = useAppSelector((state) => state.search);
  const { relatedKey } = useAppSelector((state) => state.videoDetails)
  const dispatch = useDispatch();

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [isLiked, setIsLiked] = useState<boolean>();

  const channelDetails: any = selectedChannelList?.[0];

  const handleInfiniteScroll = async () => {
    try {
      if (window.innerHeight +
        document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        fetchSearchResults(dispatch, searchedList, relatedKey, nextSearchToken)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubscribe = async () => {
    try {
      const response = await axiosPost(SUBSCRIBE_URL, { loggerId: "ZSq7BhR4IJhN8746dbgOR6gTfKt2", channelId: channelDetails?.id, channelDpUrl: channelDetails?.[ServerKeys.SNIPPET]?.[ServerKeys.THUMBNAILS]?.[ServerKeys.DEFAULT]?.[ServerKeys.URL], email: "test@123" }, true)
      if (response.status === HttpStatusCode.Ok) {
        setIsSubscribed(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnsubscribe = async () => {
    try {
      const response = await axiosDelete(`${UNSUBSCRIBE_URL}/${channelId}/${"ZSq7BhR4IJhN8746dbgOR6gTfKt2"}`, true)
      if (response.status === HttpStatusCode.Ok) {
        setIsSubscribed(false)
      }
      console.log(response, "uns")
    } catch (error) {
      console.log(error)
    }
  }

  const checkIsSubscribed = async () => {
    try {
      const response = await axiosGet(`${FIND_ONE_SUBSCRIBE_URL}/${channelId}/${"ZSq7BhR4IJhN8746dbgOR6gTfKt2"}`, true)
      if (response.status === HttpStatusCode.Ok) {
        if (response?.data?.channelId) {
          setIsSubscribed(true)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const checkIsLiked = async () => {
    try {
      const response = await axiosGet(`${GET_ONE_LIKED_VIDEO_URL}/${videoId}/${"ZSq7BhR4IJhN8746dbgOR6gTfKt2"}`, true);
      if (response?.data?.videoId) {
        setIsLiked(response?.data?.isLiked);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleLike = async (isLiked: boolean) => {
    try {
      const body = {
        loggerId: "ZSq7BhR4IJhN8746dbgOR6gTfKt2",
        channelId,
        videoId,
        isLiked,
        thumbnailUrl: channelDetails?.[ServerKeys.SNIPPET]?.[ServerKeys.THUMBNAILS]?.[ServerKeys.DEFAULT]?.[ServerKeys.URL],
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
    }
  }

  const handleUpdateLike = async () => {
    try {
      const response = await axiosDelete(`${UPDATE_LIKE_VIDEO_URL}${"ZSq7BhR4IJhN8746dbgOR6gTfKt2"}/${videoId}/${true}`, true);
      if (response?.status === HttpStatusCode.Ok) {
        setIsLiked(undefined);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [nextSearchToken])

  useEffect(() => {
    checkIsLiked();
    checkIsSubscribed();
    // fetchAllSubscribe(dispatch, "ZSq7BhR4IJhN8746dbgOR6gTfKt2")
    fetchSearchResults(dispatch, [], relatedKey);
    fetchSelectedChannel(dispatch, channelId);
  }, [])

  return (
    // <>
    <Row>
      <Col sm={24} md={15}>
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
      <Col className='px_2' sm={24} md={9}>
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