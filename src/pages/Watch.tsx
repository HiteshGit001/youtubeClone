/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useLocation, useSearchParams } from 'react-router-dom'
import useAppSelector from '../hooks/useAppSelector'
import VideoCard from '../components/VideoCard/VideoCard'
import { fetchSearchResults, fetchSelectedChannel } from '../store/slice/searchSlice'
import { useDispatch } from 'react-redux'
import { ServerKeys } from '../api/serverKeys'

const Watch = () => {
  const [queryParams] = useSearchParams();
  const { state } = useLocation();
  console.log(state, "state");
  const videoId: any = queryParams.get("v");
  const channelId: any = videoId.split(",")?.[1]

  const { searchedList, nextSearchToken, selectedChannelList } = useAppSelector((state) => state.search);
  const { relatedKey } = useAppSelector((state) => state.videoDetails)
  const dispatch = useDispatch();

  const channelDetails = selectedChannelList?.[0];

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

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [nextSearchToken])

  useEffect(() => {
    fetchSearchResults(dispatch, [], relatedKey);
    fetchSelectedChannel(dispatch, channelId);
  }, [])

  return (
    <>
      <Row>
        <Col sm={24} md={15}>
          <ReactPlayer controls playing loop width="100%" url={`https://www.youtube.com/watch?v=${videoId}`} />
          <Row>
            <Col>
              <img src={channelDetails?.[ServerKeys.SNIPPET]?.[ServerKeys.THUMBNAILS]?.[ServerKeys.DEFAULT]?.[ServerKeys.URL]} />
              <p>{channelDetails?.[ServerKeys.SNIPPET]?.[ServerKeys.TITLE]}</p>
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
    </>
  )
}

export default Watch