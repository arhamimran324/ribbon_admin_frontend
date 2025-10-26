import React, { PropsWithChildren } from "react";

import DashboardLayout from "@/components/layouts/dashboard-layout";

const layout = ({ children }: PropsWithChildren) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
