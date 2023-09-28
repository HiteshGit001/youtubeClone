import { Drawer } from "antd";
import { Placement } from "rc-drawer/lib/Drawer";
import { CSSProperties, ReactElement } from "react";
import cx from "classnames";

interface ICustomDrawer {
  open: boolean;
  onClose: () => void;
  drawerBody: ReactElement;
  title?: ReactElement | string;
  placement?: Placement;
  width?: number;
  bodyStyle?: CSSProperties;
  className?: string;
}
const CustomDrawer = (props: ICustomDrawer) => {
  const {
    open,
    onClose,
    drawerBody,
    title = "",
    placement = "left",
    width = 300,
    bodyStyle = {
      padding: 0,
    },
    className,
  } = props;

  return (
    <Drawer
      title={title}
      placement={placement}
      width={width}
      onClose={onClose}
      open={open}
      bodyStyle={bodyStyle}
      className={cx(className, "bg_primary")}
    >
      {drawerBody}
    </Drawer>
  );
};

export default CustomDrawer;
