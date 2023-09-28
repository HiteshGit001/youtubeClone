import { useLocation } from "react-router-dom";
import { useData } from "../../context/DataContext";
import cx from "classnames";
import { Paths } from "../../routes/pats";

interface IIconContainer {
  icon: string,
  title: string,
  path: string,
  isPrivate: boolean,
  handleDrawer: () => void,
}
const IconContainer = (props: IIconContainer) => {
  const {
    icon,
    title,
    path,
    isPrivate,
    handleDrawer,
  } = props;
  const { navigateToSpecificRoute } = useData();
  const { pathname } = useLocation()

  const handleNavigation = () => {
    !isPrivate
      ? navigateToSpecificRoute(path)
      : navigateToSpecificRoute(Paths.LOGIN);
    handleDrawer();
  }

  return (
    <div
      onClick={handleNavigation}
      className={cx(pathname === path ? "bg_danger" : "", "flex g_2 align_center p_2 pointer")}
    >
      {
        icon ?
          <img width={35} src={icon} alt={title} />
          : <></>
      }
      <p className="tt_capitalize">{title}</p>
    </div>
  )
}

export default IconContainer