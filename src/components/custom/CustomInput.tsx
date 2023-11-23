import { Input } from "antd";
import cx from "classnames";
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  MouseEvent,
  ReactElement,
} from "react";

import ErrorContainer from "../common/ErrorContainer";
import CustomButton from "./CustomButton";

// import CustomButton from "./CustomButton";

interface ICustomInput {
  label?: string;
  required?: boolean;
  value?: string | number;
  name?: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  type?: string;
  suffixIcon?: ReactElement;
  id?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onClick?: () => void;
  icon?: ReactElement | string
}

const CustomInput: FC<ICustomInput> = (props) => {
  const {
    min,
    max,
    maxLength = Infinity,
    minLength,
    error,
    value,
    name,
    touched,
    className,
    disabled,
    type = "text",
    suffixIcon = <></>,
    id = "",
    placeholder = "",
    onChange = () => null,
    onBlur = () => null,
    onClick = () => null,
    icon = ""
  } = props;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Check if the entered value exceeds the maximum length
    if (type === "number" && e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength); // Truncate the value
    }
    onChange(e); // Call the original onChange function
  };

  const handleWheel = (event: MouseEvent<HTMLInputElement>) => {
    return event.currentTarget.blur();
  };

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
    <>
      <div className="custom_input_container flex align_center">
        <Input
          id={id}
          className={cx("custom_input", className)}
          name={name}
          value={value}
          onChange={handleInputChange}
          type={type}
          min={min}
          max={max}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          suffix={suffixIcon}
          // onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => (type === "number" ? handleKeyPress(event) : () => null)}
          onWheel={handleWheel}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        {icon && <CustomButton onClick={onClick} className="bg_gray btn flex align_center h_100" icon={iconUi} />}
      </div>
      <ErrorContainer
        touched={touched}
        error={error}
      />
    </>
  );
};

export default CustomInput;
