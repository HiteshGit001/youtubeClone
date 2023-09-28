import { useState } from 'react'
import CustomInput from '../custom/CustomInput';
import { SearchOutlined } from "@ant-design/icons";
import CustomDrawer from '../custom/CustomDrawer';
import MenueContainer from './MenueContainer';
import { generateSidPannelOption } from '../../uiData/sidePannelOption';

import Home from "../../assets/icons/icons/Home.svg";
import Short from "../../assets/icons/icons/Short.svg";
import Subscriptions from "../../assets/icons/icons/Subscriptions.svg";

import HomeFill from "../../assets/icons/selectedIcons/HomeFill.svg";
import ShortFill from "../../assets/icons/selectedIcons/ShortFill.svg";
import SubscriptionsFill from "../../assets/icons/selectedIcons/SubscriptionsFill.svg";
import { Paths } from '../../routes/pats';
import useAppSelector from '../../hooks/useAppSelector';
import { useLocation } from 'react-router-dom';
import IconContainer from './IconContainer';
import { Col, Row } from 'antd';
import Avather from '../Avather/Avather';

const Navbar = () => {
  const { userData } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();

  const [sideDrawer, setSideDrawer] = useState<boolean>(false);

  const handleDrawer = () => {
    setSideDrawer(!sideDrawer);
  };

  const allSideIcon = [
    generateSidPannelOption("home icon", Home, false, "home", HomeFill, pathname === Paths.HOME, Paths.HOME),
    generateSidPannelOption("short icon", Short, false, "short", ShortFill, pathname === Paths.SHORTS, Paths.SHORTS),
    generateSidPannelOption("subscription icon", Subscriptions, userData.loggerId ? false : true, "subscription", SubscriptionsFill, pathname === Paths.SUBSCRIPTION, Paths.SUBSCRIPTION),
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
      <Row className='align_center'>
        <Col sm={24} md={6}>
          <MenueContainer onClick={handleDrawer} />
        </Col>
        <Col sm={24} md={12}>
          <CustomInput
            placeholder='Search'
            icon={<SearchOutlined />}
          />
        </Col>
        <Col sm={24} md={6}>
          <div className='flex justify_end'>
            <Avather />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Navbar