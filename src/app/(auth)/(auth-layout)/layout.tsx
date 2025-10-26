import React, { PropsWithChildren } from "react";

import Authlayout from "@/components/layouts/auth-layout";

const layout = ({ children }: PropsWithChildren) => {
  return <Authlayout>{children}</Authlayout>;
};

export default layout;
