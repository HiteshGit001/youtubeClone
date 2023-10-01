import { createSlice } from "@reduxjs/toolkit"
import { ChannelListSchema, SearchedListSchema } from "../../api/dataSchemas"
import { AppDispatch, RootState } from "../storage"
import { axiosGet } from "../../utils/https.server"
import { CHANNEL_URL, SEARCH_URL } from "../../api/api"
import { HttpStatusCode } from "axios"

interface ISearchSlice {
  searchedList: SearchedListSchema[],
  selectedChannelList: ChannelListSchema[],
  nextSearchToken: string,
}
const initialState: ISearchSlice = {
  searchedList: [],
  selectedChannelList: [],
  nextSearchToken: "",
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchedList: (state, action) => {
      return {
        ...state,
        searchedList: action.payload,
      }
    },
    updateNextSearchToken: (state, action) => {
      return {
        ...state,
        nextSearchToken: action.payload,
      }
    },
    updateSelectedChannelId: (state, action) => {
      return {
        ...state,
        selectedChannelList: action.payload,
      }
    }
  }
});

export const fetchSearchResults = async (dispatch: AppDispatch, searchList: SearchedListSchema[], query = "", nextPageToken = "") => {
  try {
    const response = await axiosGet(`${SEARCH_URL}&pageToken=${nextPageToken}&q=${query}`, true);
    if (response.status === HttpStatusCode.Ok) {
      dispatch(updateSearchedList([...searchList, ...response.data.items]));
      dispatch(updateNextSearchToken(response?.data?.nextPageToken));
    }
  } catch (err) {
    console.log(err);
  }
}

export const fetchSelectedChannel = async (dispatch: AppDispatch, channelId: string) => {
  try {
    const response = await axiosGet(`${CHANNEL_URL}&id=${channelId}`, true);
    if (response.status === HttpStatusCode.Ok) {
      console.log(response, channelId, "kkid");
      dispatch(updateSelectedChannelId(response?.data?.items));
    }
  } catch (error) {
    console.log(error);
  }
}

export const {
  updateSearchedList,
  updateNextSearchToken,
  updateSelectedChannelId,
} = searchSlice.actions;

export const searchSelector = (state: RootState): object => state.auth;

export default searchSlice.reducer;