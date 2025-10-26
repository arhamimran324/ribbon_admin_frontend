import { Icon } from "@iconify/react";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

type IconifyProps = {
  icon: string;
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  [key: string]: any;
};

const Iconify = forwardRef<HTMLElement, IconifyProps>(
  ({ icon, color, width = 20, height = 20, className, ...other }, ref) => {
    const size = `w-[${width}px] h-[${height}px]`;
    return (
      <span
        ref={ref}
        className={`inline-flex items-center justify-center ${size} ${className}`}
        {...other}
      >
        <Icon icon={icon} width={width} height={height} color={color} />
      </span>
    );
  },
);

Iconify.displayName = "Iconify";

export default Iconify;
