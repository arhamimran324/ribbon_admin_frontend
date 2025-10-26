import React, { FC, PropsWithChildren } from "react";

const ScrollContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="overflow-auto max-h-56">{children}</div>;
};

export default ScrollContainer;
