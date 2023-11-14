export const truncate = (str: string, count: number) => {
  return str?.slice(0, count) + (str?.length > count ? "..." : "")
}