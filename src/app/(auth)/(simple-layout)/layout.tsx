import React, { PropsWithChildren } from "react";

import Simplelayout from "@/components/layouts/simple-layout";

const layout = ({ children }: PropsWithChildren) => {
  return <Simplelayout>{children}</Simplelayout>;
};

export default layout;
