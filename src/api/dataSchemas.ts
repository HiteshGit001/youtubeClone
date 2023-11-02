import { ServerKeys } from "./serverKeys"

export type UserDataSchema = {
  [ServerKeys.FIRST_NAME]: string,
  [ServerKeys.LAST_NAME]: string,
  [ServerKeys.EMAIL_ID]: string,
  [ServerKeys.PASSWORD]: string,
  [ServerKeys.LOGGER_ID]: string,
}

export type SideIcons = {
  [ServerKeys.NAME]: string,
  [ServerKeys.ICON]: string,
  [ServerKeys.IS_PRIVATE]: boolean,
  [ServerKeys.TITLE]: string,
  [ServerKeys.ICON_SELECTED]: string,
  [ServerKeys.IS_SELECTED]: boolean,
  [ServerKeys.PATH]: string,
}

export type ContentDetails = {
  [ServerKeys.DURATION]: string,
}

export type Localized = {
  [ServerKeys.TITLE]: string,
  [ServerKeys.DESCRIPTION]: string,
}

export type ThumbnailObj = {
  [ServerKeys.URL]: string,
  [ServerKeys.WIDTH]: number,
  [ServerKeys.HEIGHT]: number,
}

export type Thumbnails = {
  [ServerKeys.DEFAULT]: ThumbnailObj,
  [ServerKeys.HIGH]: ThumbnailObj,
  [ServerKeys.MEDIUM]: ThumbnailObj,
  [ServerKeys.STANDARD]: ThumbnailObj,
  [ServerKeys.TITLE]: string,
  [ServerKeys.MAXRES]: ThumbnailObj,
}

export type Snippet = {
  [ServerKeys.CHANNEL_ID]: string,
  [ServerKeys.CHANNEL_TITLE]: string,
  [ServerKeys.DEFAULT_AUDIO_LANGUAGE]: string,
  [ServerKeys.DESCRIPTION]: string,
  [ServerKeys.LOCALIZED]: Localized,
  [ServerKeys.PUBLISHED_AT]: string,
  [ServerKeys.THUMBNAILS]: Thumbnails,
  [ServerKeys.TITLE]: string,
}

export type Statistics = {
  [ServerKeys.COMMENTED_COUNT]: string,
  [ServerKeys.LIKE_COUNT]: string,
  [ServerKeys.VIEW_COUNT]: string,
}
export type VideoDetails = {
  [ServerKeys.CONTENT_DETAILS]: ContentDetails,
  [ServerKeys.SNIPPET]: Snippet,
  [ServerKeys.STATISTICS]: Statistics,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [ServerKeys.ID]?: any,
}

export type ID = {
  [ServerKeys.KIND]: string,
  [ServerKeys.VIDEO_ID]: string,
  [ServerKeys.CHANNEL_ID]: string,
}

export type ChannelListSchema = {
  [ServerKeys.SNIPPET]: Snippet,
  [ServerKeys.STATISTICS]: Statistics,
}

export type SearchedListSchema = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [ServerKeys.ID]: any,
  [ServerKeys.CONTENT_DETAILS]: ContentDetails,
  [ServerKeys.SNIPPET]: Snippet,
  [ServerKeys.STATISTICS]: Statistics,
}