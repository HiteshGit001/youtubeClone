import { Button, Tooltip } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ReactElement } from "react";
import cx from "classnames";

interface ICustomButton {
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: SizeType;
  icon?: ReactElement | string;
  loading?: boolean;
  onClick?: () => void;
  htmlType?: "submit" | "button" | "reset" | undefined;
  iconPosition?: string;
  name?: string;
  type?: "default" | "primary" | "link" | "text" | "dashed" | undefined;
}

const CustomButton = (props: ICustomButton) => {
  const {
    label = "",
    className = "",
    disabled = false,
    icon = "",
    size = "middle",
    loading = false,
    onClick = () => null,
    htmlType = "submit",
    iconPosition = "left",
    name = "",
    type = "primary",
  } = props;

  const iconUi =
    typeof icon === "string" && icon ? (
      <img
        src={icon}
        alt='Icon'
        loading='lazy'
      />
    ) : (
      icon
    );

  return (
    <Tooltip title={name ? name : label}>
      <Button
        className={cx(disabled ? "" : className, "customButton")}
        disabled={disabled}
        onClick={onClick}
        size={size}
        loading={loading}
        type={type}
        htmlType={htmlType}
      >
        {iconPosition === "left" && icon && <span>{iconUi}</span>}
        {label}
        {iconPosition === "right" && icon && <span>{iconUi}</span>}
      </Button>
    </Tooltip>
  );
};

export default CustomButton;
