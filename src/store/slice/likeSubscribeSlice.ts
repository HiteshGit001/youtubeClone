import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "../storage";
import { axiosGet } from "../../utils/https.server";
import { ALL_SUBSCRIBE_URL } from "../../api/api";
import { HttpStatusCode } from "axios";

interface ILikeSubscribeSlice {
  allSubscribed: any,
}

const initialState: ILikeSubscribeSlice = {
  allSubscribed: [],
}

export const likeSubscribeSlice = createSlice({
  name: "likeSubscribe",
  initialState,
  reducers: {
    updateAllSubscribedList: (state, action) => {
      return {
        ...state,
        allSubscribed: action.payload
      }
    },
  }
})

export const fetchAllSubscribe = async (dispatch: AppDispatch, id: string) => {
  try {
    const response = await axiosGet(`${ALL_SUBSCRIBE_URL}/${id}`, true)
    if (response.status === HttpStatusCode.Ok) {
      dispatch(updateAllSubscribedList(response?.data))
    }
  } catch (err) {
    console.log(err)
  }
}

export const {
  updateAllSubscribedList,
} = likeSubscribeSlice.actions;

export const likeSubscribe = (state: RootState): object => state.likeSubscribe;

export default likeSubscribeSlice.reducer