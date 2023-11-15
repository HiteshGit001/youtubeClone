import { createSlice } from "@reduxjs/toolkit";
import { VideoDetails } from "../../api/dataSchemas";
import { AppDispatch, RootState } from "../storage";
import { axiosGet } from "../../utils/https.server";
import { MOST_POPULAR_URL, YOUTUBE_KEY } from "../../api/api";
import { HttpStatusCode } from "axios";

interface IVideoDetails {
  videoList: VideoDetails[],
  nextVideosToke: string,
  filterContent: string[],
  relatedKey: string,
}

const initialState: IVideoDetails = {
  videoList: [],
  nextVideosToke: "",
  filterContent: ["all"],
  relatedKey: "",
}

export const videoDetailsSlice = createSlice({
  name: "videoDetails",
  initialState,
  reducers: {
    updateVideoList: (state, action) => {
      return {
        ...state,
        videoList: action.payload,
      }
    },
    updateNextVideosToke: (state, action) => {
      return {
        ...state,
        nextVideosToke: action.payload,
      }
    },
    updateFilterContent: (state, action) => {
      return {
        ...state,
        filterContent: action.payload,
      }
    },
    updateRelatedKey: (state, action) => {
      return {
        ...state,
        relatedKey: action.payload
      }
    }
  }
});

export const fetchVideos = async (dispatch: AppDispatch, videoList: VideoDetails[], setIsLoading: any, nextPageToken = "") => {
  try {
    const response = await axiosGet(
      `${MOST_POPULAR_URL}&pageToken=${nextPageToken}&regionCode=IN&key=${YOUTUBE_KEY}`,
      true
    )
    if (response.status === HttpStatusCode.Ok) {
      setIsLoading(false);
      dispatch(updateVideoList([...videoList, ...response.data.items]));
      console.log(response?.data?.nextPageToken, "resp next p");
      dispatch(updateNextVideosToke(response?.data?.nextPageToken));
    }
  } catch (error) {
    console.log(error);
  }
}

export const {
  updateVideoList,
  updateNextVideosToke,
  updateFilterContent,
  updateRelatedKey,
} = videoDetailsSlice.actions;

export const videoDetailsSelector = (state: RootState): object => state.videoDetails;

export default videoDetailsSlice.reducer;