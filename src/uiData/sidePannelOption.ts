export const generateSidPannelOption = (
  name: string,
  icon: string,
  isPrivate: boolean,
  title: string,
  iconSelected: string,
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