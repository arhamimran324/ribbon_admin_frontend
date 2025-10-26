// components/TotalEarningsCard.tsx
import React from "react";

import { Typography } from "@/components/shared/typography";

interface TotalEarningsCardProps {
  total: number;
  withdrawal: number;
  pending: number;
}

const TotalEarningsCard: React.FC<TotalEarningsCardProps> = ({
  total,
  withdrawal,
  pending,
}) => {
  return (
    <div className="px-6 py-8 bg-gradient-blue rounded-[16px] text-white">
      <div className="text-center">
        <Typography size="h5" className="font-bold">
          Total Earnings
        </Typography>
        <Typography size="h2" className="text-wrap font-bold my-4">
          ${total.toFixed(2)}
        </Typography>
      </div>
      <div>
        <hr className="py-3.5" />
      </div>
      <div className="flex flex-col pt-6 pb-[22px] gap-4">
        <div>
          <Typography size="lg" className="font-bold">
            Total Withdrawal
          </Typography>
          <Typography size="lg" className="font-medium">
            ${withdrawal}
          </Typography>
        </div>
        <div>
          <Typography size="lg">Total Pending </Typography>
          <Typography size="lg" className="font-medium">
            ${pending.toFixed(2)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default TotalEarningsCard;
