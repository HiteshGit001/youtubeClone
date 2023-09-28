import { UserDataSchema } from "../../api/dataSchemas"
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../storage";

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

export const {
  updateUserData,
} = authSlice.actions;

export const authSelector = (state: RootState): object => state.auth;

export default authSlice.reducer;