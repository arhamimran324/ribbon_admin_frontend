import React, { FC } from "react";

import { ContainerCardProps } from "@/types";
import Container from ".";
import { Typography } from "../typography";

const ContainerCard: FC<ContainerCardProps> = ({
  cardHeading,
  children,
  headingAlign = "center",
  isSubHeading = false,
  subHeading,
}) => {
  return (
    <Container>
      <div className="w-full">
        <div className="py-8 sm:py-10">
          <Typography
            size="h3"
            as="h3"
            className={`text-black text-${headingAlign}`}
          >
            {cardHeading}
          </Typography>
          {isSubHeading && (
            <Typography size="md" as="p" className="text-secondary-text-gray">
              {subHeading}
            </Typography>
          )}
        </div>
        {children}
      </div>
    </Container>
  );
};

export default ContainerCard;
