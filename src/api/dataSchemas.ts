import { ServerKeys } from "./serverKeys"

export type UserDataSchema = {
  [ServerKeys.FIRST_NAME]: string,
  [ServerKeys.LAST_NAME]: string,
  [ServerKeys.EMAIL_ID]: string,
  [ServerKeys.PASSWORD]: string,
  [ServerKeys.LOGGER_ID]: string,
}

export type SideIcons = {
  name: string,
  icon: string,
  isPrivate: boolean,
  title: string,
  iconSelected: string,
  isSelected: boolean,
  path: string,
}