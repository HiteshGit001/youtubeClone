export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_KEY;

export const MOST_POPULAR_URL = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular`
export const VIDEO_URL = `${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${YOUTUBE_KEY}`
export const SEARCH_URL = `${BASE_URL}/search?part=snippet&maxResults=25&key=${YOUTUBE_KEY}`
export const CHANNEL_URL = `${BASE_URL}/channels?part=snippet%2Cstatistics&key=${YOUTUBE_KEY}`

// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=AIzaSyD7cgMLUWU6EtTP5MvpB_rHFqJm30LmfB4&q=Gaming