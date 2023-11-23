import { useLocation } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";

import Home from "../../assets/icons/icons/Home.svg";
import Short from "../../assets/icons/icons/Short.svg";
import Subscriptions from "../../assets/icons/icons/Subscriptions.svg";
import Like from "../../assets/icons/icons/Like.svg";

import HomeFill from "../../assets/icons/selectedIcons/HomeFill.svg";
import ShortFill from "../../assets/icons/selectedIcons/ShortFill.svg";
import SubscriptionsFill from "../../assets/icons/selectedIcons/SubscriptionsFill.svg";
import LikeFill from "../../assets/icons/selectedIcons/LikeFill.svg";

import { Paths } from "../../routes/pats";
import { useData } from "../../context/DataContext";
import { generateSidPannelOption } from "../../uiData/sidePannelOption";
import { SideIcons } from "../../api/dataSchemas";

const SidePannel = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const { navigateToSpecificRoute } = useData()
  const sidePannelIcons = [
    generateSidPannelOption("home icon", Home, false, "home", HomeFill, pathname === Paths.HOME, Paths.HOME),
    generateSidPannelOption("short icon", Short, false, "short", ShortFill, pathname === Paths.SHORTS, Paths.SHORTS),
    generateSidPannelOption("subscription icon", Subscriptions, userData.loggerId ? false : true, "subscription", SubscriptionsFill, pathname === Paths.SUBSCRIPTION, Paths.SUBSCRIPTION),
    generateSidPannelOption("like icon", Like, userData.loggerId ? false : true, "Like Dislike", LikeFill, pathname === Paths.LIKED_VIDEOS, Paths.LIKED_VIDEOS),
  ];

  const handleNavigate = (path: string) => {
    navigateToSpecificRoute(path);
  }

  return (
    <div className="p_4">
      {
        sidePannelIcons.map((ele: SideIcons) => {
          return (
            !ele.isPrivate
              ? <div onClick={() => handleNavigate(ele.path)} className="py_2 pointer ta_center">
                <img width={35} src={ele.isSelected ? ele.iconSelected : ele.icon} alt={ele.name} />
                <p className="tt_capitalize fs_xs font_primary fw_500">{ele.title}</p>
              </div>
              : <></>
          )
        })
      }
    </div>
  )
}

export default SidePannel