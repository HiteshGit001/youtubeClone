import { Col, Row } from 'antd';
import useAppSelector from '../hooks/useAppSelector';
import VideoCard from '../components/VideoCard/VideoCard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchSearchResults } from '../store/slice/searchSlice';
import { useSearchParams } from 'react-router-dom';
import { ServerKeys } from '../api/serverKeys';
import ChannelCard from '../components/ChannelCard/ChannelCard';
import { useData } from '../context/DataContext';

const Search = () => {
  const { searchedList, nextSearchToken } = useAppSelector((state) => state.search);
  const { success } = useData()

  const [queryParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchId: any = queryParams.get(ServerKeys.ID);

  const dispatch = useDispatch();

  const handleInfiniteScroll = async () => {
    try {
      if (window.innerHeight +
        document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        fetchSearchResults(dispatch, searchedList, searchId, nextSearchToken)
      }
    } catch (error) {
      console.log(error);
      success("error", "Something went wrong", 10)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [nextSearchToken])

  useEffect(() => {
    fetchSearchResults(dispatch, [], searchId)
  }, [searchId])

  return (
    <Row className='pr_4'>
      {
        searchedList?.map((ele, index) => {
          return (
            <Col key={index} sm={24} md={24}>
              {
                ele?.id?.videoId
                  ? <VideoCard
                    isVertical={false}
                    videoDetails={ele}
                  />
                  : <ChannelCard channelDetails={ele} />
              }
            </Col>
          )
        })
      }
    </Row>
  )
}

export default Search