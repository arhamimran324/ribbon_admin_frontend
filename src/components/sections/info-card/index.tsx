import React from "react";

import Container from "@/components/shared/container";
import Iconify from "@/components/shared/iconify";
import { Typography } from "@/components/shared/typography";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  styling?: string;
}

const InfoCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  styling = "",
}) => {
  return (
    <Container styling={`p-[21.8px] ${styling}`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <Typography
            size="md"
            className="text-gray font-semibold leading-none"
          >
            {title}
          </Typography>
          <Typography
            size="h4"
            className="text-dark-charcoal font-bold leading-none"
          >
            {value}
          </Typography>
        </div>
        <div>
          <div className="flex justify-center items-center rounded-[10px] bg-gradient-blue p-3">
            <Iconify icon={icon} color="white" width="40px" height="40px" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default InfoCard;
