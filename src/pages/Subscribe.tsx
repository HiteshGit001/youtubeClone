import { useEffect, useState } from 'react'
import { axiosGet } from '../utils/https.server'
import useAppSelector from '../hooks/useAppSelector'
import { ALL_SUBSCRIBE_URL } from '../api/api'
import { HttpStatusCode } from 'axios'
import { ServerKeys } from '../api/serverKeys'
import { formatSubscriberCount, viewCountFormatter } from '../helper/numberFormatter'
import { useData } from '../context/DataContext'
import { Paths } from '../routes/pats'
import { Col, Row, Tooltip } from 'antd'
import { truncate } from '../helper/stringerFormatter'

const Subscribe = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const { navigateToSpecificRoute } = useData()
  const [allSub, setAllSub] = useState([]);

  const fetchAllSubscribe = async () => {
    try {
      const response = await axiosGet(`${ALL_SUBSCRIBE_URL}/${userData?.loggerId}`, true);
      if (response.status === HttpStatusCode.Ok) {
        setAllSub(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (searchQuery: string) => {
    navigateToSpecificRoute(`${Paths.SEARCH}?id=${searchQuery}`);
  }

  useEffect(() => {
    if (userData?.loggerId) {
      fetchAllSubscribe();
    }
  }, [userData?.loggerId])

  return (
    <Row className='g_4'>
      {
        allSub?.map((ele: any) => {
          return (
            <Tooltip placement='bottom' key={ele?.channelDpUrl} title={ele?.channelName}>
              <Col sm={8} md={3} onClick={() => handleSearch(ele?.channelName)} className='card_white pointer'>
                <img className='chanel_sub_img' src={ele?.channelDpUrl} alt="channel icon" />
                <p className='black fs_md fw_500'>{truncate(ele?.channelName, ele?.channelName?.length > 13 ? 10 : 13)}</p>
                <p className='black fw_400 fs_xs'>Subscriber: {formatSubscriberCount(ele?.[ServerKeys.CHANNEL_DETAILS]?.[ServerKeys.STATISTICS]?.[ServerKeys.SUBSCRIBER_COUNT])}</p>
                <p className='black fw_400 fs_xs'>Total View: {viewCountFormatter(ele?.[ServerKeys.CHANNEL_DETAILS]?.[ServerKeys.STATISTICS]?.[ServerKeys.VIEW_COUNT])}</p>
              </Col>
            </Tooltip>
          )
        })
      }
    </Row>
  )
}

export default Subscribe