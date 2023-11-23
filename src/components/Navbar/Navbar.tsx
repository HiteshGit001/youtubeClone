/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import CustomInput from '../custom/CustomInput';
import { SearchOutlined } from "@ant-design/icons";
import CustomDrawer from '../custom/CustomDrawer';
import MenueContainer from './MenueContainer';
import { generateSidPannelOption } from '../../uiData/sidePannelOption';

import Home from "../../assets/icons/icons/Home.svg";
import Short from "../../assets/icons/icons/Short.svg";
import Subscriptions from "../../assets/icons/icons/Subscriptions.svg";
import Like from "../../assets/icons/icons/Like.svg";
import SignIn from "../../assets/icons/icons/SignIn.svg"

import HomeFill from "../../assets/icons/selectedIcons/HomeFill.svg";
import ShortFill from "../../assets/icons/selectedIcons/ShortFill.svg";
import SubscriptionsFill from "../../assets/icons/selectedIcons/SubscriptionsFill.svg";
import LikeFill from "../../assets/icons/selectedIcons/LikeFill.svg";

import { Paths } from '../../routes/pats';
import useAppSelector from '../../hooks/useAppSelector';
import { useLocation } from 'react-router-dom';
import IconContainer from './IconContainer';
import { Col, Row } from 'antd';
import Avather from '../Avather/Avather';
import { getLocalStorage, setLocalStorage } from '../../utils/webStorage';
import { ServerKeys } from '../../api/serverKeys';
import { Constants } from '../../uiData/constantValues';
import { useData } from '../../context/DataContext';

const Navbar = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const { navigateToSpecificRoute } = useData();

  const [sideDrawer, setSideDrawer] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleDrawer = () => {
    setSideDrawer(!sideDrawer);
  };

  const handleSearchChange = async (value: string) => {
    setSearchQuery(value);
  }

  const handleFilterContent = async () => {
    const preFilterContent: any = getLocalStorage(ServerKeys.FILTER_DATA)
    const parsedData: any = JSON.parse(preFilterContent)
    if (searchQuery) {
      if (parsedData?.length) {
        // if we have max number of filter content then remove last element and push new query
        if (parsedData?.length >= Constants.MAX_FILTER_LENGTH) {
          parsedData.pop()
          setLocalStorage(ServerKeys.FILTER_DATA, JSON.stringify([...parsedData, searchQuery.toLowerCase()]))
        } else {
          setLocalStorage(ServerKeys.FILTER_DATA, JSON.stringify([...parsedData, searchQuery.toLowerCase()]))
        }
      } else {
        setLocalStorage(ServerKeys.FILTER_DATA, JSON.stringify([searchQuery.toLowerCase()]))
      }
    }
    navigateToSpecificRoute(`${Paths.SEARCH}?id=${searchQuery}`);
  }

  const allSideIcon = [
    generateSidPannelOption("home icon", Home, false, "home", HomeFill, pathname === Paths.HOME, Paths.HOME),
    generateSidPannelOption("login icon", Short, false, "short", ShortFill, pathname === Paths.SHORTS, Paths.SHORTS),
    generateSidPannelOption("subscription icon", Subscriptions, userData.loggerId ? false : true, "subscription", SubscriptionsFill, pathname === Paths.SUBSCRIPTION, Paths.SUBSCRIPTION),
    generateSidPannelOption("like icon", Like, userData.loggerId ? false : true, "Like Dislike", LikeFill, pathname === Paths.LIKED_VIDEOS, Paths.LIKED_VIDEOS),
    generateSidPannelOption("signin icon", SignIn, userData.loggerId ? true : false, "signin", SignIn, pathname === Paths.LOGIN, Paths.LOGIN),
  ]

  return (
    <div className='p_6'>
      <CustomDrawer
        open={sideDrawer}
        onClose={handleDrawer}
        title={<> <MenueContainer isIcon={false} onClick={handleDrawer} /></>}
        drawerBody={
          <>
            {
              allSideIcon.map((ele) => {
                return (
                  <IconContainer
                    isPrivate={ele.isPrivate}
                    path={ele.path}
                    title={ele.title}
                    icon={ele.icon}
                    handleDrawer={handleDrawer}
                  />
                )
              })
            }
          </>
        }
      />
      <Row gutter={22} className='align_center'>
        <Col sm={24} md={6}>
          <MenueContainer onClick={handleDrawer} />
        </Col>
        <Col xs={20} md={12}>
          <CustomInput
            placeholder='Search'
            onChange={(event) => handleSearchChange(event.target.value)}
            icon={<SearchOutlined />}
            onClick={handleFilterContent}
          />
        </Col>
        <Col xs={4} md={6}>
          <div className='flex justify_end'>
            <Avather />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Navbar