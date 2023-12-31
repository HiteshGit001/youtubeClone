import { UserDataSchema } from "../../api/dataSchemas"
import { createSlice } from "@reduxjs/toolkit";
import { axiosGet, axiosPost } from "../../utils/https.server";
import { GET_USER_DATA_URL, LOGIN_URL } from "../../api/api";
import { HttpStatusCode } from "axios";
import { setLocalStorage } from "../../utils/webStorage";
import { Paths } from "../../routes/pats";
// import { RootState } from "../storage";

interface IAuthState {
  userData: UserDataSchema,
}
const initialState: IAuthState = {
  userData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    loggerId: "",
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      return {
        ...state,
        userData: action.payload,
      }
    }
  }
})

export const login = async (email: string, password: string, dispatch: any, navigateToSpecificRoute: any, success: any, successMsg: string) => {
  try {
    const loginRes = await axiosPost(LOGIN_URL, { email, password }, true)
    if (loginRes.status === HttpStatusCode.Ok) {
      setLocalStorage("loggerId", loginRes?.data?.loggerId)
      dispatch(updateUserData(loginRes?.data))
      success("success", successMsg, 20)
      navigateToSpecificRoute(Paths.HOME)
    }
  } catch (error) {
    success("error", "Something went wrong", 10)
  }
}

export const getUserData = async (loggerID: string, dispatch: any) => {
  try {
    const response = await axiosGet(`${GET_USER_DATA_URL}/${loggerID}`, true);
    if (response.status === HttpStatusCode.Ok) {
      dispatch(updateUserData(response?.data))
    }
  } catch (error) {
    console.log(error)
  }
}

export const {
  updateUserData,
} = authSlice.actions;

// export const authSelector = (state: RootState): object => state.auth;

export default authSlice.reducer;