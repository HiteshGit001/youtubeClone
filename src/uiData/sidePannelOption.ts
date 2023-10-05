/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateSidPannelOption = (
  name: string,
  icon: any,
  isPrivate: boolean,
  title: string,
  iconSelected: any,
  isSelected: boolean,
  path: string,
) => {
  return {
    name,
    icon,
    isPrivate,
    title,
    iconSelected,
    isSelected,
    path,
  }
}