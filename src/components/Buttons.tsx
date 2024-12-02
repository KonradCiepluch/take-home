import { FC } from "react";
import { cx } from "../utils";

type ButtonProps = React.ComponentProps<"button">;

export const ToggleButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={cx(
        "hover:text-gray-500 transition-colors flex items-center justify-center",
        props.className
      )}
    >
      {children}
    </button>
  );
};
