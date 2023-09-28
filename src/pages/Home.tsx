import React, { useEffect } from 'react'
import { axiosGet } from '../utils/https.server'

const Home = () => {
  useEffect(() => {
    const response = axiosGet(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyBimZcCKNa9aEm54sIXczG-dXob5E2LHCc"
      , true
    )
    console.log(response);
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home