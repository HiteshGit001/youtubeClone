export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_KEY;
export const BACK_BASE_URL = import.meta.env.VITE_BACK_BASE_URL;

export const MOST_POPULAR_URL = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular`
export const VIDEO_URL = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${YOUTUBE_KEY}`
export const SEARCH_URL = `${BASE_URL}/search?part=snippet&maxResults=25&key=${YOUTUBE_KEY}`
export const CHANNEL_URL = `${BASE_URL}/channels?part=snippet%2Cstatistics&key=${YOUTUBE_KEY}`

export const SIGN_UP_URL = `${BACK_BASE_URL}/sign-up`
export const LOGIN_URL = `${BACK_BASE_URL}/login`

export const LIKE_VIDEO_URL =  `${BACK_BASE_URL}/like-video`
export const UPDATE_LIKE_VIDEO_URL = `${BACK_BASE_URL}/update-liked-video/`
export const GET_ONE_LIKED_VIDEO_URL = `${BACK_BASE_URL}/get-one-liked-video`

export const UNSUBSCRIBE_URL = `${BACK_BASE_URL}/unsubscribe`
export const FIND_ONE_SUBSCRIBE_URL = `${BACK_BASE_URL}/find-one-subscribe`
export const ALL_SUBSCRIBE_URL = `${BACK_BASE_URL}/get-all-subscribe`
export const SUBSCRIBE_URL = `${BACK_BASE_URL}/subscribe`
// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=AIzaSyD7cgMLUWU6EtTP5MvpB_rHFqJm30LmfB4&q=Gaming