import dayjs from "dayjs"

export const getDuration = (date: string) => {
  if (dayjs(date).isBefore(dayjs(new Date()).add(1, "d"))) {
    return dayjs(new Date()).diff(dayjs(date), "h") + " hour ago"
  }
  else if (dayjs(date).isBefore(dayjs(new Date()).add(1, "M"))) {
    return dayjs(new Date()).diff(dayjs(date), "d") + " day ago"
  }
  else if (dayjs(date).isBefore(dayjs(new Date()).add(1, "y"))) {
    return dayjs(new Date()).diff(dayjs(date), "M") + " month ago"
  } else {
    return dayjs(new Date()).diff(dayjs(date), "y") + " year ago"
  }
}
