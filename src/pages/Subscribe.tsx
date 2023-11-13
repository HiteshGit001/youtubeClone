import { useEffect, useState } from 'react'
import { axiosGet } from '../utils/https.server'
import useAppSelector from '../hooks/useAppSelector'
import { ALL_SUBSCRIBE_URL } from '../api/api'
import { HttpStatusCode } from 'axios'

const Subscribe = () => {
  const { userData } = useAppSelector((state) => state.auth)
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

  useEffect(() => {
    if (userData?.loggerId) {
      fetchAllSubscribe();
    }
  }, [userData?.loggerId])

  return (
    <div className='flex g_4'>
      {
        allSub?.map((ele: any) => {
          return (
            <img className='chanel_sub_img' key={ele?.channelDpUrl} src={ele?.channelDpUrl} alt="channel icon" />
          )
        })
      }
    </div>
  )
}

export default Subscribe