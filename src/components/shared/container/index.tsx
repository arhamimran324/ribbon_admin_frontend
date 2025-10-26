import React, { FC } from "react";

import { ContainerProps } from "@/types";

const Container: FC<ContainerProps> = ({
  styling,
  children,
  isSideBorder,
  isBottomBorder,
}) => {
  return (
    // custom-shadow
    <div className="w-full flex  relative bg-white rounded-[16px]">
      {isSideBorder && (
        <div className="w-4 bg-primary-gradient rounded-tl-[16px] rounded-bl-[16px]" />
      )}
      <div className={`w-full bg-white rounded-lg ${styling}`}>{children}</div>
      {isSideBorder && <div className="w-4 bg-white rounded-r-[16px]" />}
      {isBottomBorder && (
        <div className="absolute bottom-0 left-0 w-full h-3 bg-primary-gradient rounded-b-[18px]" />
      )}
    </div>
  );
};

export default Container;
