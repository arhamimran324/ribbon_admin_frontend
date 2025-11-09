import React from "react";

import Container from "@/components/shared/container";
import { Typography } from "@/components/shared/typography";

const CreditAndWalletTab = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
      {/* Credit Card */}
      <Container isSideBorder styling="w-full">
        <div className=" flex items-center justify-between p-8">
          <div className="flex flex-col gap-8">
            <Typography size="h4" className=" font-bold text-blue">
              Credit
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography size="sm" className=" text-gray">
                Total Amount in Dollars
              </Typography>
              <Typography size="h4" className=" font-bold text-blue">
                £460
              </Typography>
            </div>
          </div>
        </div>
      </Container>

      {/* Wallet Card */}
      <Container isSideBorder styling="w-full">
        <div className=" flex items-center justify-between p-8">
          <div className="flex flex-col gap-8">
            <Typography size="h4" className=" font-bold text-blue">
              Wallet
            </Typography>
            <div className="flex flex-col gap-2">
              <Typography size="sm" className=" text-gray">
                Total Amount in POL
              </Typography>
              <Typography size="h4" className=" font-bold text-blue">
                0.24 POL
              </Typography>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CreditAndWalletTab;
