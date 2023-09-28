import axios from "axios"
import { getSessionStorage } from "./webStorage";
import { ServerKeys } from "../api/serverKeys";
import { ContentType } from "../api/contentType";

export const axiosGet = (url: string, authKeyExists: boolean, contentType = ContentType.JSON) => {
  const headers = {
    'Content-Type': contentType,
    ...(authKeyExists) && { Authorization: getSessionStorage(ServerKeys.LOGGER_ID) },
  };
  return axios.get(url, { headers });
}

export const axiosPost = (url: string, body: any, authKeyExists: boolean, contentType = ContentType.JSON) => {
  const headers = {
    'Content-Type': contentType,
    ...(authKeyExists) && { Authorization: getSessionStorage(ServerKeys.LOGGER_ID) },
  };
  return axios.post(url, body, { headers })
}